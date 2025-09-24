import { useState, useEffect } from "react";

const TimerQuestion = () => {
  const [counter, setCounter] = useState(0);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    if (!isWorking) return;

    const intervalId = setInterval(() => {
      if (isWorking) {
        // We have to use prevState because of clousers
        setCounter((prevState) => prevState + 1);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isWorking]);

  return (
    <>
      <button onClick={() => setIsWorking(true)}>Start</button>
      <button onClick={() => setIsWorking(false)}>Stop</button>
      <button onClick={() => setCounter(0)}>Reset</button>
      <p>{counter}</p>

      {/* <SearchAndFilter /> */}
    </>
  );
};

export default TimerQuestion;
