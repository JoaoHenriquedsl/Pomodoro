import { useEffect, useState, useCallback, useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

const usePomodoro = () => {
  const { settings } = useContext(SettingsContext);
  const { initialSeconds, shortSeconds, longSeconds, sessions } = settings;
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [currentSession, setCurrentSession] = useState('pomodoro');
  const [isBreak, setIsBreak] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const intervalId = setInterval(() => setSecondsLeft(prev => prev - 1), 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds, sessions]);

  const handleTimerComplete = useCallback(() => {
    if (currentSession === 'pomodoro') {
      if (pomodoroCount < sessions) {
        setSecondsLeft(shortSeconds);
        setCurrentSession('short');
      } else {
        setSecondsLeft(longSeconds);
        setCurrentSession('long');
        setPomodoroCount(0);
      }
    } else if (currentSession === 'short') {
      setSecondsLeft(initialSeconds);
      setCurrentSession('pomodoro');
    } else if (currentSession === 'long') {
      setSecondsLeft(initialSeconds);
      setCurrentSession('pomodoro');
    }
    setIsRunning(false);
    setIsBreak(false);
  }, [currentSession, pomodoroCount]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      handleTimerComplete();
      if (currentSession === 'pomodoro' && pomodoroCount < sessions) setPomodoroCount(prevCount => prevCount + 1);
    }
  }, [secondsLeft, handleTimerComplete]);

  const start = () => {
    if (!isRunning && !isBreak || !isRunning && isBreak) {
      setIsRunning(true);
    }
  };

  const pause = (state: string) => {
    if (isRunning && state === 'change') {
      setIsRunning(false);
      setIsBreak(false);
    } else if (isRunning) {
      setIsRunning(false);
      setIsBreak(true);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setCurrentSession('pomodoro');
    setPomodoroCount(0);
    setSecondsLeft(initialSeconds);
  };

  return { secondsLeft, pomodoroCount, currentSession, isRunning, setIsRunning, setCurrentSession, setIsBreak, setSecondsLeft, start, pause, reset };
};

export default usePomodoro;