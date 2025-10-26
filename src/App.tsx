import { useEffect, useState } from 'react';
import './App.css';
import Control from './components/Controls/Control';
import usePomodoro from './hooks/usePomodoro';
import SessionSelector from './components/SessionCounter/SessionSelector';

function App() {
  const [timerMinutes, setTimerMinutes] = useState<string>();
  const [timerSeconds, setTimerSeconds] = useState<string>();
  const { secondsLeft, pomodoroCount, currentSession, isRunning, setSecondsLeft, setCurrentSession, start, pause, reset } = usePomodoro();

  useEffect(() => {
    setTimerMinutes((Math.floor(secondsLeft / 60)).toString().padStart(2, '0'));
    setTimerSeconds((secondsLeft % 60).toString().padStart(2, '0'));
  }, [secondsLeft]);

  return (
    <>
      <div id="app" className={currentSession}>
        <div className="panel">
          <SessionSelector 
            pause={pause} 
            setSecondsLeft={setSecondsLeft} 
            currentSession={currentSession} 
            setCurrentSession={setCurrentSession} 
          />
          <div className='clock-container'>
            <span className="clock">{timerMinutes}:</span>
            <span className="clock">{timerSeconds}</span>
          </div>
          <Control start={start} pause={pause} reset={reset} />
        </div>
        <div>
          <span className="sessionCount">{pomodoroCount} / 4</span>
        </div>
        <div>
          {isRunning && <span onClick={() => setSecondsLeft(0)} id="skip">SKIP</span>}
        </div>
      </div>
    </>
  );
}

export default App;
