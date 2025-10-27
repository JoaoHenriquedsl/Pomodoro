import './Control.css';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

interface ControlProps {
  start: () => void;
  pause: (state: string) => void;
  reset: () => void;
}

const Control = ({ start, pause, reset }: ControlProps) => {
  return (
    <div id="control-container">
      <div id="start">
        <button onClick={start}><FaPlay /> Start</button>
      </div>
      <div id="pause">
        <button onClick={() => pause('')}><FaPause /> Pause</button>
      </div>
      <div id="reset">
        <button onClick={reset}><FaStop /> Reset</button>
      </div>
    </div>
  );
};

export default Control;