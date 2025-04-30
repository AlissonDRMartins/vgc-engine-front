/* eslint-disable prefer-const */
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
}

export const AnimatedNumber = ({
  value,
  duration = 500,
  delay = 0,
}: AnimatedNumberProps) => {
  const [displayedValue, setDisplayedValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    let timeout: NodeJS.Timeout;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = timestamp - start;
      const progressRatio = Math.min(progress / duration, 1);
      const newValue = Math.floor(value * progressRatio);
      setDisplayedValue(newValue);
      if (progress < duration) {
        raf = requestAnimationFrame(step);
      } else {
        setDisplayedValue(value);
      }
    };

    timeout = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [value, duration, delay]);

  return <>{displayedValue}</>;
};
