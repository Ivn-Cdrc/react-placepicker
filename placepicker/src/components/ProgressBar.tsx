import { useState, useEffect } from "react";

const ProgressBar = ({timer}: {timer: number}) => {
  const [remainingTime, setRemainingTime] = useState<number>(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress value={remainingTime} max={timer} />
  );
}
 
export default ProgressBar;