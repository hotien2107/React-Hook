import { useEffect, useState } from "react";

function formatDate(date) {
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}

function useClock() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const currentTime = new Date();

      setTimeString(formatDate(currentTime));
    }, 1000);

    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  return { timeString };
}

export default useClock;