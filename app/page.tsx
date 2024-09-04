import Image from "next/image";
import TeamClockManager from "@/components/TeamClockManager"; // Import the new TeamClockManager component

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TeamClockManager />
    </main>
  );
}
