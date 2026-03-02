"use client";

import { useState } from "react";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export default function AddWorkoutPage() {
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleCreateWorkout = async () => {
    const now = new Date().toISOString();

    await db.workouts.add({
      id: uuidv4(),
      date: date,
      created_at: now,
      updated_at: now,
    });

    alert("Workout created!");
  };

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">
        Add Workout
      </h1>

      <div className="flex flex-col gap-4 max-w-md">
        <label className="flex flex-col">
          <span>Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
          />
        </label>

        <button
          onClick={handleCreateWorkout}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Workout
        </button>
      </div>
    </main>
  );
}