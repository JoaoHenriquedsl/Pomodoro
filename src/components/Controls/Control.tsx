import './Control.css';

interface ControlProps {
  start: () => void;
  pause: (state: string) => void;
  reset: () => void;
}

const Control = ({ start, pause, reset }: ControlProps) => {
  return (
    <div id="control-container">
      <div id="start">
        <button onClick={start}>Start</button>
      </div>
      <div id="pause">
        <button onClick={() => pause('')}>Pause</button>
      </div>
      <div id="reset">
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Control;