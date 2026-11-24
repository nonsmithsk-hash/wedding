'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download } from 'lucide-react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target: 9 December 2026, 17:00:00 IST (UTC+5:30)
    // 2026-12-09T17:00:00+05:30 -> UTC 2026-12-09T11:30:00Z
    const targetDate = new Date('2026-12-09T17:00:00+05:30').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const googleCalUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' +
    encodeURIComponent('शुभ विवाह • राकेश संग पूजा') +
    '&details=' +
    encodeURIComponent(
      '॥ श्री गणेशाय नमः ॥ मांगलिक वैवाहिक उत्सव। वर: राकेश यादव संग वधू: पूजा यादव। शुभ बारात एवं परिणय संस्कार।'
    ) +
    '&location=' +
    encodeURIComponent('ग्राम नाहूपुर, सोडरी, आजमगढ़') +
    '&dates=20261209T170000/20261210T040000';

  const downloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Rakesh & Pooja Wedding//EN',
      'BEGIN:VEVENT',
      'SUMMARY:शुभ विवाह • राकेश संग पूजा',
      'DESCRIPTION:मांगलिक परिणय उत्सव (राकेश यादव संग पूजा यादव)',
      'LOCATION:ग्राम नाहूपुर, सोडरी, आजमगढ़',
      'DTSTART:20261209T113000Z',
      'DTEND:20261209T223000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Rakesh_Pooja_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-lg mx-auto py-8 px-4 flex flex-col items-center text-center">
      <div className="flex items-center gap-2 text-[#C5A059] mb-3 animate-blur-in">
        <Clock className="w-4 h-4 text-[#D4AF37]" />
        <span className="font-montserrat text-xs uppercase tracking-[0.25em] font-semibold text-[#F8E7B4]">
          See you on Wednesday, 9 Dec 2026
        </span>
      </div>

      <p className="font-hindi text-base sm:text-lg font-bold text-[#FFE599] mb-5 drop-shadow animate-blur-in">
        शुभ परिणय की पावन उल्टी गिनती • Live Countdown
      </p>

      {/* 4 Time Cards Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-md animate-blur-in-delayed">
        {[
          { label: 'DAYS', hindi: 'दिन', value: timeLeft.days },
          { label: 'HOURS', hindi: 'घंटे', value: timeLeft.hours },
          { label: 'MINUTES', hindi: 'मिनट', value: timeLeft.minutes },
          { label: 'SECONDS', hindi: 'सेकंड', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center py-3.5 sm:py-4 px-1 rounded-2xl bg-gradient-to-b from-black/80 via-[#23080E]/90 to-black/85 border border-[#D4AF37]/45 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md"
          >
            <span className="font-playfair text-2xl sm:text-3xl md:text-4xl font-black text-[#F8E7B4] tracking-tight drop-shadow">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="font-montserrat text-[10px] sm:text-xs text-[#D4AF37] font-bold tracking-widest uppercase mt-0.5">
              {item.label}
            </span>
            <span className="font-hindi text-[9px] text-[#A67C52]">{item.hindi}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons: Add to Calendar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 animate-blur-in-delayed-2">
        <a
          href={googleCalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#997428] via-[#E2B744] to-[#997428] text-[#200A02] font-montserrat text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <Calendar className="w-4 h-4 text-[#200A02]" />
          <span>+ ADD TO CALENDAR</span>
        </a>

        <button
          onClick={downloadIcs}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-[#D4AF37]/50 text-[#F8E7B4] font-montserrat text-xs font-semibold tracking-wider transition-all duration-300"
          title="Download .ics event file"
        >
          <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>.iCal</span>
        </button>
      </div>
    </div>
  );
}
