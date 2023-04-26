import React, { useEffect, useState } from "react";
import "./TimeComponent.css";

function TimeComponent() {
  const [timeLeft, setTimeLeft] = useState({
    hours: "12",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const saleEnd = new Date("2023-04-27T00:00:00Z").getTime();
      const timeDiff = saleEnd - now;

      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="time-component"
      style={{ height: "70px", width: "400px", marginLeft: "10px" }}
    >
      <div className="countdown">
        <div className="countdown-item">
          <span id="hours">{timeLeft.hours}</span>
          <div className="countdown-label">HOURS</div>
        </div>
        <div className="countdown-item">
          <span id="minutes">{timeLeft.minutes}</span>
          <div className="countdown-label">MINUTES</div>
        </div>
        <div className="countdown-item">
          <span id="seconds">{timeLeft.seconds}</span>
          <div className="countdown-label">SECONDS</div>
        </div>
      </div>
    </div>
  );
}

export default TimeComponent;
