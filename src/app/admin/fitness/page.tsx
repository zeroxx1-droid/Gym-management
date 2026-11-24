"use client";

import React, { useState } from "react";
import { useGym } from "@/context/GymContext";
import { WorkoutPlan, DietPlan, Member } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  Dumbbell,
  Utensils,
  Calendar,
  Flame,
  Award,
  Users,
  ChevronDown,
  ChevronUp,
  Clock,
  Plus,
  Zap,
} from "lucide-react";

export default function FitnessPage() {
  const { workoutPlans, dietPlans, members, assignFitnessPlans } = useGym();

  const [activeTab, setActiveTab] = useState<"workouts" | "diets" | "assignments">("workouts");
  const [expandedWorkoutId, setExpandedWorkoutId] = useState<string>(workoutPlans[0]?.id || "");
  const [expandedDietId, setExpandedDietId] = useState<string>(dietPlans[0]?.id || "");

  // Assign modal
  const [assignModalMember, setAssignModalMember] = useState<Member | null>(null);
  const [targetWorkoutId, setTargetWorkoutId] = useState<string>("");
  const [targetDietId, setTargetDietId] = useState<string>("");

  const handleOpenAssign = (member: Member) => {
    setAssignModalMember(member);
    setTargetWorkoutId(member.assignedWorkoutPlanId || workoutPlans[0]?.id || "");
    setTargetDietId(member.assignedDietPlanId || dietPlans[0]?.id || "");
  };

  const handleSaveAssign = () => {
    if (!assignModalMember) return;
    assignFitnessPlans(assignModalMember.id, targetWorkoutId, targetDietId);
    setAssignModalMember(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Dumbbell className="w-7 h-7 text-lime-400" />
            Workout Protocols & Nutrition Programs
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Build periodized training schedules, configure macronutrient targets, and assign regimens to members.
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex items-center bg-dark-900 p-1 rounded-xl border border-dark-700 text-xs">
          <button
            onClick={() => setActiveTab("workouts")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === "workouts"
                ? "bg-lime-500 text-black shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>Workout Plans ({workoutPlans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("diets")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === "diets"
                ? "bg-lime-500 text-black shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Diet Plans ({dietPlans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("assignments")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === "assignments"
                ? "bg-lime-500 text-black shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Member Assignments</span>
          </button>
        </div>
      </div>

      {/* WORKOUT PLANS TAB */}
      {activeTab === "workouts" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workoutPlans.map((plan) => {
              const isSelected = expandedWorkoutId === plan.id;
              const assignedCount = members.filter((m) => m.assignedWorkoutPlanId === plan.id).length;

              return (
                <div
                  key={plan.id}
                  onClick={() => setExpandedWorkoutId(plan.id)}
                  className={`cursor-pointer bg-dark-900 border rounded-xl p-5 transition-all text-xs ${
                    isSelected
                      ? "border-lime-500 shadow-[0_0_20px_rgba(204,255,0,0.15)] ring-1 ring-lime-500"
                      : "border-dark-700/80 hover:border-zinc-600"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <Badge variant={isSelected ? "lime" : "outline"} size="sm">
                      {plan.goal}
                    </Badge>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {plan.durationWeeks} Weeks
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-2 mb-1">
                    {plan.title}
                  </h3>
                  <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-dark-800 flex items-center justify-between text-[11px] text-zinc-400">
                    <span>{plan.daysPerWeek} training days/week</span>
                    <span className="text-lime-400 font-bold">{assignedCount} athletes</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Workout Protocol Expanded Weekly Schedule */}
          {workoutPlans.find((w) => w.id === expandedWorkoutId) && (
            <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-6 shadow-card space-y-6">
              {(() => {
                const plan = workoutPlans.find((w) => w.id === expandedWorkoutId)!;
                return (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-dark-700">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-extrabold text-white">
                            {plan.title}
                          </h2>
                          <Badge variant="lime" size="sm">
                            {plan.level} Level
                          </Badge>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          {plan.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-zinc-300">
                        <span className="px-3 py-1 bg-dark-950 rounded-lg border border-dark-700 font-mono">
                          Goal: <strong className="text-lime-400">{plan.goal}</strong>
                        </span>
                        <span className="px-3 py-1 bg-dark-950 rounded-lg border border-dark-700 font-mono">
                          Schedule: <strong className="text-white">{plan.daysPerWeek} Days/Wk</strong>
                        </span>
                      </div>
                    </div>

                    {/* Schedule Days */}
                    <div className="space-y-4">
                      {plan.schedule.map((day, idx) => (
                        <div
                          key={idx}
                          className="bg-dark-950 border border-dark-700 rounded-xl overflow-hidden"
                        >
                          <div className="bg-dark-850 px-4 py-2.5 border-b border-dark-700 flex items-center justify-between">
                            <span className="text-xs font-bold text-white flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-lime-400" />
                              {day.day}
                            </span>
                            <span className="text-[11px] text-lime-400 font-semibold font-mono">
                              Focus: {day.focus}
                            </span>
                          </div>

                          <div className="p-4 overflow-x-auto">
                            <table className="w-full text-left text-xs">
                              <thead className="text-[10px] text-zinc-400 uppercase tracking-wider border-b border-dark-800">
                                <tr>
                                  <th className="pb-2 font-medium">Exercise Movement</th>
                                  <th className="pb-2 font-medium">Sets</th>
                                  <th className="pb-2 font-medium">Target Reps</th>
                                  <th className="pb-2 font-medium">Rest Window</th>
                                  <th className="pb-2 font-medium">Coaching Technique Notes</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-dark-800">
                                {day.exercises.map((ex, i) => (
                                  <tr key={i} className="hover:bg-dark-900/50">
                                    <td className="py-2.5 font-bold text-white pr-4">
                                      {ex.name}
                                    </td>
                                    <td className="py-2.5 text-zinc-300 pr-4 font-mono">
                                      {ex.sets} sets
                                    </td>
                                    <td className="py-2.5 text-lime-400 pr-4 font-mono font-bold">
                                      {ex.reps}
                                    </td>
                                    <td className="py-2.5 text-zinc-400 pr-4 font-mono">
                                      {ex.restSeconds}s rest
                                    </td>
                                    <td className="py-2.5 text-zinc-400 italic">
                                      {ex.notes || "Standard cadence"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* DIET PLANS TAB */}
      {activeTab === "diets" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dietPlans.map((diet) => {
              const isSelected = expandedDietId === diet.id;
              const assignedCount = members.filter((m) => m.assignedDietPlanId === diet.id).length;

              return (
                <div
                  key={diet.id}
                  onClick={() => setExpandedDietId(diet.id)}
                  className={`cursor-pointer bg-dark-900 border rounded-xl p-5 transition-all text-xs ${
                    isSelected
                      ? "border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400"
                      : "border-dark-700/80 hover:border-zinc-600"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <Badge variant="info" size="sm">
                      {diet.targetGoal}
                    </Badge>
                    <span className="text-xs font-mono font-bold text-white">
                      {diet.caloriesTarget} kcal / day
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-2 mb-1">
                    {diet.title}
                  </h3>
                  <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                    {diet.description}
                  </p>

                  {/* Macros breakdown pills */}
                  <div className="grid grid-cols-3 gap-2 my-3 text-center">
                    <div className="bg-dark-950 p-2 rounded-lg border border-dark-700">
                      <span className="text-[10px] text-zinc-400 uppercase block">Protein</span>
                      <span className="font-bold text-lime-400 text-xs">{diet.proteinGrams}g</span>
                    </div>
                    <div className="bg-dark-950 p-2 rounded-lg border border-dark-700">
                      <span className="text-[10px] text-zinc-400 uppercase block">Carbs</span>
                      <span className="font-bold text-amber-400 text-xs">{diet.carbsGrams}g</span>
                    </div>
                    <div className="bg-dark-950 p-2 rounded-lg border border-dark-700">
                      <span className="text-[10px] text-zinc-400 uppercase block">Healthy Fats</span>
                      <span className="font-bold text-rose-400 text-xs">{diet.fatsGrams}g</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-dark-800 flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Hydration: {diet.waterLiters}L / day</span>
                    <span className="text-cyan-400 font-bold">{assignedCount} assigned athletes</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expanded Diet Schedule Breakdown */}
          {dietPlans.find((d) => d.id === expandedDietId) && (
            <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-6 shadow-card space-y-5">
              {(() => {
                const plan = dietPlans.find((d) => d.id === expandedDietId)!;
                return (
                  <>
                    <div className="flex items-center justify-between pb-4 border-b border-dark-700">
                      <div>
                        <h2 className="text-xl font-extrabold text-white">
                          {plan.title}
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1">
                          {plan.description}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-cyan-400 font-mono">
                          {plan.caloriesTarget}
                        </span>
                        <span className="text-xs text-zinc-400 block font-sans">
                          daily calorie target
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {plan.meals.map((meal, idx) => (
                        <div
                          key={idx}
                          className="bg-dark-950 border border-dark-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-dark-800 text-lime-400 font-mono font-bold text-[10px] border border-dark-700">
                                {meal.time}
                              </span>
                              <h4 className="font-bold text-white text-sm">
                                {meal.mealName}
                              </h4>
                            </div>
                            <p className="text-zinc-400 text-xs">
                              {meal.foods.join(" • ")}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 text-right sm:border-l sm:border-dark-800 sm:pl-4">
                            <div>
                              <span className="font-mono font-bold text-white text-sm block">
                                {meal.calories} kcal
                              </span>
                              <span className="text-[10px] text-lime-400 font-mono block">
                                {meal.protein}g protein
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* MEMBER ASSIGNMENTS TAB */}
      {activeTab === "assignments" && (
        <div className="bg-dark-900 border border-dark-700/80 rounded-xl overflow-hidden shadow-card">
          <div className="p-4 border-b border-dark-700/80">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Athlete Fitness Roster
            </h3>
            <p className="text-xs text-zinc-400">
              Assigned workout regimens and nutritional protocols for each member.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-dark-950/80 text-zinc-400 uppercase tracking-wider text-[11px] border-b border-dark-700/80">
                <tr>
                  <th className="py-3 px-4 font-semibold">Athlete</th>
                  <th className="py-3 px-4 font-semibold">Membership Plan</th>
                  <th className="py-3 px-4 font-semibold">Assigned Workout Program</th>
                  <th className="py-3 px-4 font-semibold">Assigned Nutrition Plan</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-800">
                {members.map((member) => {
                  const currentWorkout = workoutPlans.find((w) => w.id === member.assignedWorkoutPlanId);
                  const currentDiet = dietPlans.find((d) => d.id === member.assignedDietPlanId);

                  return (
                    <tr key={member.id} className="hover:bg-dark-850/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={member.avatarUrl}
                            alt={member.fullName}
                            className="w-8 h-8 rounded-lg object-cover border border-dark-700"
                          />
                          <div>
                            <span className="font-bold text-white block">
                              {member.fullName}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-mono">
                              {member.qrCodeDisplay}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-zinc-300">
                        {member.planName}
                      </td>

                      <td className="py-3 px-4">
                        {currentWorkout ? (
                          <span className="font-semibold text-lime-400">
                            {currentWorkout.title}
                          </span>
                        ) : (
                          <span className="text-zinc-500 italic">None assigned</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {currentDiet ? (
                          <span className="font-semibold text-cyan-400">
                            {currentDiet.title}
                          </span>
                        ) : (
                          <span className="text-zinc-500 italic">None assigned</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenAssign(member)}
                        >
                          Change Plans
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {assignModalMember && (
        <Modal
          isOpen={Boolean(assignModalMember)}
          onClose={() => setAssignModalMember(null)}
          title={`Assign Fitness Programs: ${assignModalMember.fullName}`}
          description="Select customized workout protocols and nutritional plans."
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Workout Protocol
              </label>
              <select
                value={targetWorkoutId}
                onChange={(e) => setTargetWorkoutId(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white text-xs"
              >
                <option value="">None / Open Gym Floor</option>
                {workoutPlans.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.title} ({w.goal} • {w.daysPerWeek} days/wk)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Nutrition & Diet Plan
              </label>
              <select
                value={targetDietId}
                onChange={(e) => setTargetDietId(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white text-xs"
              >
                <option value="">None / Self Directed</option>
                {dietPlans.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title} ({d.caloriesTarget} kcal)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-dark-700">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAssignModalMember(null)}
              >
                Cancel
              </Button>
              <Button variant="lime" size="sm" onClick={handleSaveAssign}>
                Save Assignments
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
