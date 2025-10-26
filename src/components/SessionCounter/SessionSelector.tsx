import useSettings from '../../hooks/useSettings';
import './SessionSelection.css';

interface ControlProps {
  pause: (state: string) => void;
  setSecondsLeft: React.Dispatch<React.SetStateAction<number>>;
  currentSession: string;
  setCurrentSession: React.Dispatch<React.SetStateAction<string>>;
}

const SessionSelector = ({ pause, setSecondsLeft, currentSession, setCurrentSession }: ControlProps) => {
  const { initialSeconds, shortSeconds, longSeconds } = useSettings();

  const handleChange = (seconds: number, section: string = 'pomodoro') => {
    setSecondsLeft(seconds);
    setCurrentSession(section);
    pause('change');
  };

  return (
    <div id="sessionSelector" className={currentSession}>
      <div className="btn-container">
        <button id="pomodoro" onClick={() => handleChange(initialSeconds, 'pomodoro')}>Pomodoro</button>
        <button id="short" onClick={() => handleChange(shortSeconds, 'short')}>Short Break</button>
        <button id="long" onClick={() => handleChange(longSeconds, 'long')}>Long Break</button>
      </div>
    </div>
  );
};

export default SessionSelector;