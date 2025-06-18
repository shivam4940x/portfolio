import { useEffect, useState } from "react";

export const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(formatted);
    };

    update(); // initialize immediately
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval); // cleanup
  }, []);

  return <div>{time}</div>;
};
