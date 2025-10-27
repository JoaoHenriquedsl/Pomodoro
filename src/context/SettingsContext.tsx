import { createContext, useState, type ReactNode } from "react";

export const SettingsContext = createContext<any>(undefined)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState({
        initialSeconds: 1500,
        shortSeconds: 300,
        longSeconds: 900,
        sessions: 4
    })

    return (
        <SettingsContext.Provider value={{settings, setSettings}}>
            {children}
        </SettingsContext.Provider>
    );
};
