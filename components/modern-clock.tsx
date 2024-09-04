"use client"

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toZonedTime, format } from "date-fns-tz"; // Import toZonedTime and format

interface ClockProps {
  timezone: string;
  memberName: string;
}

const Clock: React.FC<ClockProps> = ({ timezone, memberName }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const zonedTime = toZonedTime(date, timezone); // Get the zoned time
    return format(zonedTime, "hh:mm:ss a"); // Format the time
  };

  // Calculate the zoned time for the clock hands
  const zonedTime = toZonedTime(time, timezone);
  const hoursDegrees = (zonedTime.getHours() % 12) * 30; // 360 / 12 = 30 degrees per hour
  const minutesDegrees = zonedTime.getMinutes() * 6; // 360 / 60 = 6 degrees per minute
  const secondsDegrees = zonedTime.getSeconds() * 6; // 360 / 60 = 6 degrees per second

  return (
    <Card className="w-full max-w-[400px] shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-blue-500 text-white">
        <CardTitle className="text-center text-lg font-bold">{memberName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full pt-[100%]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Clock face */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-200 dark:text-gray-700"
            />

            {/* Hour markers */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="10"
                x2="50"
                y2="15"
                transform={`rotate(${i * 30} 50 50)`}
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-400 dark:text-gray-500"
              />
            ))}

            {/* Hour hand */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="25"
              transform={`rotate(${hoursDegrees} 50 50)`}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-gray-800 dark:text-gray-200"
            />

            {/* Minute hand */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="20"
              transform={`rotate(${minutesDegrees} 50 50)`}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-gray-600 dark:text-gray-300"
            />

            {/* Second hand */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="15"
              transform={`rotate(${secondsDegrees} 50 50)`}
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              className="text-red-500"
            />

            {/* Center dot */}
            <circle
              cx="50"
              cy="50"
              r="2"
              fill="currentColor"
              className="text-gray-800 dark:text-gray-200"
            />
          </svg>
        </div>
        <div className="text-center mt-4 text-xl font-semibold">
          {formatTime(time)}
        </div>
        <div className="text-center mt-1 text-sm text-gray-500 dark:text-gray-400">
          {timezone}
        </div>
      </CardContent>
    </Card>
  );
};

export function ModernClock({ teamMembers }) { // Accept teamMembers as a prop
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Team World Clock</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <Clock key={index} memberName={member.name} timezone={member.timezone} />
        ))}
      </div>
    </div>
  );
}