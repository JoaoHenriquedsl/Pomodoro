import './Settings.css'
import { useContext, useState } from 'react';
import { FaCheck, FaRegClock } from 'react-icons/fa';
import { SettingsContext } from '../context/SettingsContext';
import usePomodoro from '../hooks/usePomodoro';

interface ControlProps {
    setIsSettingsOpen: (isOpen: boolean) => void;
}

const Settings = ({ setIsSettingsOpen }: ControlProps) => {
    const { settings, setSettings } = useContext(SettingsContext)
    const [pomodoroTime, setPomodoroTime] = useState<any>((settings.initialSeconds / 60));
    const [shortBreakTime, setShortBreakTime] = useState<any>((settings.shortSeconds / 60));
    const [longBreakTime, setLongBreakTime] = useState<any>((settings.longSeconds / 60));
    const [sessionsInput, setSessionsInput] = useState<any>((settings.sessions));
    const { reset } = usePomodoro()


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSettings({
            initialSeconds: parseInt(pomodoroTime) * 60,
            shortSeconds: parseInt(shortBreakTime) * 60,
            longSeconds: parseInt(longBreakTime) * 60,
            sessions: parseInt(sessionsInput)
        })
        setIsSettingsOpen(false)
        reset()
    }

    return <div id="settings-cover" onClick={() => setIsSettingsOpen(false)}>
        <div id="settings-container" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
                <h1>Settings</h1>
                <h4><FaRegClock className='icons' /> Timer (minutes)</h4>
                <div className="form-group">
                    <label htmlFor="pomodoroTime">Pomodoro</label>
                    <input
                        type="number"
                        id="pomodoroTime"
                        value={pomodoroTime}
                        onChange={(e) => setPomodoroTime(e.target.value)}
                        min="1"
                        max="60"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="shortBreakTime">Short Break</label>
                    <input
                        type="number"
                        id="shortBreakTime"
                        value={shortBreakTime}
                        onChange={(e) => setShortBreakTime(e.target.value)}
                        min="1"
                        max="30"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="longBreakTime">Long Break</label>
                    <input
                        type="number"
                        id="longBreakTime"
                        value={longBreakTime}
                        onChange={(e) => setLongBreakTime(e.target.value)}
                        min="1"
                        max="60"
                    />
                </div>

                <h4><FaCheck className='icons' />How many sessions?</h4>

                <div className="form-group">
                    <label htmlFor="sessions">Sessions</label>
                    <input
                        type="number"
                        id="sessions"
                        value={sessionsInput}
                        onChange={(e) => setSessionsInput(e.target.value)}
                        min="1"
                        max="100"
                    />
                </div>
                <button type="submit" onClick={(e) => handleSubmit(e)}>Ok</button>
            </form>
        </div>
    </div>;

};

export default Settings;
