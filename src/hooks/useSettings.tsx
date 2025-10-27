import { useState } from "react";

const useSettings = () => {
  const [initialSeconds, setInitialSeconds] = useState(1500);
  const [shortSeconds, setShortSeconds] = useState(300);
  const [longSeconds, setLongSeconds] = useState(900);
  const [sessions, setSessions] = useState(4)

  return { initialSeconds, setInitialSeconds, shortSeconds, setShortSeconds, longSeconds, setLongSeconds, sessions, setSessions };
};

export default useSettings;