"use client"

import React, { useEffect, useState } from "react";
import { ModernClock } from "@/components/modern-clock"; // Import the ModernClock component

const TeamMembers: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<{ name: string; timezone: string }[]>([]);

  useEffect(() => {
    const savedMembers = localStorage.getItem("teamMembers");
    if (savedMembers) {
      setTeamMembers(JSON.parse(savedMembers));
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-5xl p-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Saved Team Members</h1>
      <div className="w-full">
        <ModernClock teamMembers={teamMembers} />
      </div>
    </div>
  );
};

export default TeamMembers;