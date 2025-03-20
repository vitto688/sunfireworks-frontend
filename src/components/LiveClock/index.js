import { useState, useEffect } from "react";
import { format } from "date-fns";

function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format: "dd/MM/yyyy HH:mm:ss"
  const formattedDateTime = format(now, "dd/MM/yyyy HH:mm:ss");

  return <p style={{ color: "rgb(94 92 92)" }}>{formattedDateTime}</p>;
}

export default LiveClock;
