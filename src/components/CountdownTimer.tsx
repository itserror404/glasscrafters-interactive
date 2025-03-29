
import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  // Set launch date to 30 days from now for demo purposes
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (value: number): string => {
    return value < 10 ? `0${value}` : value.toString();
  };

  return (
    <div className="w-full glass-effect p-4 md:p-6 flex flex-col items-center">
      <h3 className="text-center text-white/70 text-sm md:text-base uppercase tracking-widest mb-3">
        Launch Countdown
      </h3>
      <div className="flex justify-center space-x-3 md:space-x-6">
        <div className="flex flex-col items-center">
          <div className="text-glasscraft-blue text-2xl md:text-4xl font-bold animate-countdown">
            {formatTime(timeLeft.days)}
          </div>
          <div className="text-xs md:text-sm text-white/60 uppercase">Days</div>
        </div>
        <div className="text-xl md:text-3xl text-white/80 flex items-start pt-1">:</div>
        <div className="flex flex-col items-center">
          <div className="text-glasscraft-blue text-2xl md:text-4xl font-bold animate-countdown">
            {formatTime(timeLeft.hours)}
          </div>
          <div className="text-xs md:text-sm text-white/60 uppercase">Hours</div>
        </div>
        <div className="text-xl md:text-3xl text-white/80 flex items-start pt-1">:</div>
        <div className="flex flex-col items-center">
          <div className="text-glasscraft-blue text-2xl md:text-4xl font-bold animate-countdown">
            {formatTime(timeLeft.minutes)}
          </div>
          <div className="text-xs md:text-sm text-white/60 uppercase">Minutes</div>
        </div>
        <div className="text-xl md:text-3xl text-white/80 flex items-start pt-1">:</div>
        <div className="flex flex-col items-center">
          <div className="text-glasscraft-blue text-2xl md:text-4xl font-bold animate-countdown">
            {formatTime(timeLeft.seconds)}
          </div>
          <div className="text-xs md:text-sm text-white/60 uppercase">Seconds</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
