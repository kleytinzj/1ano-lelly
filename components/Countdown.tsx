import React, { useState, useEffect } from 'react';

interface CountdownProps {
  startDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ startDate }) => {
  const [timeLeft, setTimeLeft] = useState({
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isAnniversary: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      
      const oneYearAnniversary = new Date(startDate);
      oneYearAnniversary.setFullYear(oneYearAnniversary.getFullYear() + 1);

      if (now >= oneYearAnniversary) {
        return { isAnniversary: true, months: 12, days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
      let lastMonthAnniversary = new Date(startDate);
      lastMonthAnniversary.setMonth(startDate.getMonth() + months);

      if (now < lastMonthAnniversary) {
        months--;
        lastMonthAnniversary.setMonth(startDate.getMonth() + months);
      }
      
      const remainder = now.getTime() - lastMonthAnniversary.getTime();
      
      const days = Math.floor(remainder / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainder / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainder / 1000 / 60) % 60);
      const seconds = Math.floor((remainder / 1000) % 60);
      
      return { months, days, hours, minutes, seconds, isAnniversary: false };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  const renderTimePart = (value: number, label: string) => (
    <div className="flex flex-col items-center justify-center bg-white/70 shadow-md rounded-xl p-4 w-24 h-24 sm:w-28 sm:h-28">
      <span className="text-3xl sm:text-4xl font-bold text-pink-500">{value.toString().padStart(2, '0')}</span>
      <span className="text-sm text-gray-600 uppercase tracking-wider">{label}</span>
    </div>
  );
  
  if (timeLeft.isAnniversary) {
    return (
        <div className="flex items-center justify-center text-4xl sm:text-5xl font-bold font-cursive text-red-500 animate-pulse p-8">
            Feliz 1 Ano! ❤️
        </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
      {renderTimePart(timeLeft.months, 'Meses')}
      {renderTimePart(timeLeft.days, 'Dias')}
      {renderTimePart(timeLeft.hours, 'Horas')}
      {renderTimePart(timeLeft.seconds, 'Segundos')}
    </div>
  );
};

export default Countdown;