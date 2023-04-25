import { useEffect, useState } from "react";

function Timer() {
  const [offerEnd, setOfferEnd] = useState(
    new Date().getTime() + 24 * 60 * 60 * 1000
  );
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getTimeRemaining() {
    const total = offerEnd - new Date().getTime();
    const hours = Math.floor(total / (1000 * 60 * 60));
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    return { hours, minutes, seconds };
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
          color: "white",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          fontSize: "10px",
          fontWeight: "bold",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "16px" }}>{timeRemaining.hours}-</div>
          <div>Hour</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "16px" }}>{timeRemaining.minutes}-</div>
          <div>Min</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "16px" }}>{timeRemaining.seconds}</div>
          <div>Sec</div>
        </div>
      </div>
    </>
  );
}

export default Timer;
