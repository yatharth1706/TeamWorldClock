"use client"

import React, { useState, useEffect } from "react";
import { ModernClock } from "@/components/modern-clock"; // Import the ModernClock component
import Link from "next/link"; // Import Link from Next.js

const TeamClockManager: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<{ name: string; timezone: string }[]>(() => {
    // Load from local storage if available
    const savedMembers = localStorage.getItem("teamMembers");
    return savedMembers ? JSON.parse(savedMembers) : [];
  });
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("");

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && timezone) {
      const newMember = { name, timezone };
      const updatedMembers = [...teamMembers, newMember];
      setTeamMembers(updatedMembers);
      localStorage.setItem("teamMembers", JSON.stringify(updatedMembers)); // Save to local storage
      setName("");
      setTimezone("");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl p-4 mx-auto">
      {/* Form to add team member */}
      <form onSubmit={handleAddMember} className="flex flex-col mb-4 w-full">
        <input
          type="text"
          placeholder="Member Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          required
          className="mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Timezone</option>
          <option value="America/New_York">America/New_York</option>
          <option value="America/Los_Angeles">America/Los_Angeles</option>
          <option value="America/Chicago">America/Chicago</option>
          <option value="America/Denver">America/Denver</option>
          <option value="Europe/London">Europe/London</option>
          <option value="Europe/Berlin">Europe/Berlin</option>
          <option value="Europe/Moscow">Europe/Moscow</option>
          <option value="Asia/Tokyo">Asia/Tokyo</option>
          <option value="Asia/Shanghai">Asia/Shanghai</option>
          <option value="Asia/Kolkata">Asia/Kolkata</option>
          <option value="Australia/Sydney">Australia/Sydney</option>
          <option value="Pacific/Auckland">Pacific/Auckland</option>
          <option value="America/Sao_Paulo">America/Sao_Paulo</option>
          <option value="Africa/Cairo">Africa/Cairo</option>
          <option value="Asia/Dubai">Asia/Dubai</option>
          <option value="America/Argentina/Buenos_Aires">America/Argentina/Buenos_Aires</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Add Member
        </button>
      </form>

      {/* Link to Team Members page */}
      <Link href="/team-members" className="text-blue-500 underline mb-4">
        View Saved Team Members
      </Link>

      {/* Display the clocks for added team members */}
      <ModernClock teamMembers={teamMembers} />
    </div>
  );
};

export default TeamClockManager;