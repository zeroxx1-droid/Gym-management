"use client";

import React, { useState } from "react";
import { Clock, Calendar, MapPin, User, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ScheduleTimetableProps {
  onBookClass?: (className: string) => void;
}

export const ScheduleTimetable: React.FC<ScheduleTimetableProps> = ({ onBookClass }) => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const classData: Record<string, Array<{
    time: string;
    title: string;
    category: string;
    trainer: string;
    room: string;
    intensity: "Extreme" | "High" | "Moderate" | "Recovery";
  }>> = {
    Monday: [
      { time: "06:30 AM - 07:30 AM", title: "Iron Dawn: Heavy Squat Clinic", category: "Strength", trainer: "Viktor Vance", room: "Eleiko Platform Zone", intensity: "Extreme" },
      { time: "09:00 AM - 10:00 AM", title: "Metabolic Turf Shred", category: "Conditioning", trainer: "Marcus Cruz", room: "Sprint Turf 01", intensity: "High" },
      { time: "05:30 PM - 06:30 PM", title: "Hypertrophy Blitz: Chest & Delts", category: "Strength", trainer: "Elena Thorne", room: "Main Gym Floor", intensity: "High" },
      { time: "07:00 PM - 08:00 PM", title: "Combat Striking & Heavy Bag Drill", category: "Boxing", trainer: "Marcus Cruz", room: "Combat Cage", intensity: "Extreme" },
    ],
    Tuesday: [
      { time: "07:00 AM - 08:00 AM", title: "Athletic Engine & Prowler Intervals", category: "Conditioning", trainer: "Marcus Cruz", room: "Sprint Turf 01", intensity: "High" },
      { time: "12:00 PM - 01:00 PM", title: "Lunch Power: Deadlift & Back Focus", category: "Strength", trainer: "Viktor Vance", room: "Platform 04", intensity: "Extreme" },
      { time: "06:00 PM - 07:00 PM", title: "Contrast Cryo & Mobility Release", category: "Recovery", trainer: "Elena Thorne", room: "Bio-Recovery Spa", intensity: "Recovery" },
    ],
    Wednesday: [
      { time: "06:30 AM - 07:30 AM", title: "Upper Body Hypertrophy Masterclass", category: "Strength", trainer: "Elena Thorne", room: "Main Floor", intensity: "High" },
      { time: "05:00 PM - 06:00 PM", title: "Assault Bike & Kettlebell Hell", category: "Conditioning", trainer: "Marcus Cruz", room: "Turf Strip", intensity: "Extreme" },
      { time: "07:00 PM - 08:00 PM", title: "Muay Thai Clinch & Elbow Technique", category: "Boxing", trainer: "Marcus Cruz", room: "Combat Cage", intensity: "High" },
    ],
    Thursday: [
      { time: "07:00 AM - 08:00 AM", title: "Bench Press Barbell Speed & Arch", category: "Strength", trainer: "Viktor Vance", room: "Eleiko Benches", intensity: "High" },
      { time: "06:00 PM - 07:00 PM", title: "Glute & Hamstring Hypertrophy Lab", category: "Strength", trainer: "Elena Thorne", room: "Arsenal Area", intensity: "High" },
    ],
    Friday: [
      { time: "06:30 AM - 07:30 AM", title: "Full Body Black Blitz Circuit", category: "Conditioning", trainer: "Marcus Cruz", room: "Turf Arena", intensity: "Extreme" },
      { time: "05:30 PM - 06:30 PM", title: "Friday Night Heavy Iron Lift", category: "Strength", trainer: "Viktor Vance", room: "Platform Area", intensity: "Extreme" },
      { time: "07:00 PM - 08:00 PM", title: "Post-Lift Guided Sauna & Breathwork", category: "Recovery", trainer: "Maya Lin", room: "Recovery Suite", intensity: "Recovery" },
    ],
    Saturday: [
      { time: "08:30 AM - 09:30 AM", title: "Weekend Warrior Conditioning Club", category: "Conditioning", trainer: "Marcus Cruz", room: "Entire Turf Arena", intensity: "Extreme" },
      { time: "10:30 AM - 12:00 PM", title: "Powerlifting Open Platform Session", category: "Strength", trainer: "Viktor Vance", room: "Calibrated Platforms", intensity: "Extreme" },
    ],
  };

  const currentClasses = (classData[selectedDay] || []).filter((item) => {
    if (categoryFilter === "All") return true;
    return item.category === categoryFilter;
  });

  return (
    <section id="schedule" className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900 border-y border-dark-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-lime-400 font-bold text-xs uppercase tracking-widest">
            Training Timetable
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            WEEKLY MASTERCLASS <span className="text-lime-400">SCHEDULE</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            All classes capped at 12 athletes to guarantee individualized biomechanical feedback.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedDay === day
                  ? "bg-lime-500 text-black shadow-neon"
                  : "bg-dark-950 text-zinc-400 border border-dark-700 hover:text-white"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Class Cards */}
        <div className="space-y-3 max-w-4xl mx-auto">
          {currentClasses.map((cls, idx) => (
            <div
              key={idx}
              className="bg-dark-950 border border-dark-700/80 rounded-2xl p-5 shadow-card hover:border-lime-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-lime-400 bg-lime-500/10 px-2 py-0.5 rounded border border-lime-500/20">
                    {cls.time}
                  </span>
                  <Badge
                    variant={cls.intensity === "Extreme" ? "danger" : cls.intensity === "High" ? "warning" : "info"}
                    size="sm"
                  >
                    {cls.intensity}
                  </Badge>
                </div>

                <h4 className="text-base font-extrabold text-white">
                  {cls.title}
                </h4>

                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    {cls.trainer}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {cls.room}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <Button
                  size="sm"
                  variant="lime"
                  onClick={() => onBookClass?.(cls.title)}
                  className="text-xs font-bold"
                >
                  Reserve Spot
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
