
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
    <div className="w-full border border-white/10 p-5 md:p-6 rounded-xl shadow-lg backdrop-blur-sm">
      <h3 className="text-center text-white/70 text-sm md:text-base uppercase tracking-widest mb-4 font-semibold">
        Launch Countdown
      </h3>
      <div className="flex justify-center space-x-4 md:space-x-6">
        <TimeUnit value={formatTime(timeLeft.days)} label="Days" />
        <Separator />
        <TimeUnit value={formatTime(timeLeft.hours)} label="Hours" />
        <Separator />
        <TimeUnit value={formatTime(timeLeft.minutes)} label="Minutes" />
        <Separator />
        <TimeUnit value={formatTime(timeLeft.seconds)} label="Seconds" />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: string, label: string }) => (
  <div className="flex flex-col items-center">
    <div className="px-3 py-2 rounded-lg">
      <div className="text-[#2997ff] text-2xl md:text-4xl font-bold animate-countdown">
        {value}
      </div>
    </div>
    <div className="text-xs md:text-sm text-white/60 uppercase mt-2 font-medium">{label}</div>
  </div>
);

const Separator = () => (
  <div className="text-xl md:text-3xl text-white/50 flex items-center pt-1 font-light">:</div>
);

export default CountdownTimer;
