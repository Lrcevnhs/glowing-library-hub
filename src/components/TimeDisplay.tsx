
import { useState, useEffect } from 'react';
import { formatPhilippinesTime, getPhilippinesTime } from '@/utils/dateUtils';

export const TimeDisplay = () => {
  const [time, setTime] = useState<string>(formatPhilippinesTime(getPhilippinesTime()));

  useEffect(() => {
    // Update time every second
    const intervalId = setInterval(() => {
      setTime(formatPhilippinesTime(getPhilippinesTime()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 gold-glow py-2 px-6 text-library-dark dark:text-library-accent text-lg font-semibold tracking-wide animate-glow z-50">
      <div className="flex items-center justify-center">
        <span className="mr-2">Philippines Time:</span>
        <span className="font-mono">{time}</span>
      </div>
    </div>
  );
};
