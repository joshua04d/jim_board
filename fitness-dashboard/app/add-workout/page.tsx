"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

interface Exercise {
  id: string;
  name: string;
  primary_muscle: string;
}

export default function AddWorkoutPage() {
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [workoutId, setWorkoutId] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [sets, setSets] = useState<{ weight: number; reps: number }[]>([]);

  useEffect(() => {
    const loadExercises = async () => {
      const all = await db.exercises.toArray();
      setExercises(all);
    };

    loadExercises();
  }, []);

  const handleCreateWorkout = async () => {
    const now = new Date().toISOString();
    const id = uuidv4();

    await db.workouts.add({
      id,
      date,
      created_at: now,
      updated_at: now,
    });

    setWorkoutId(id);
    alert("Workout created! Now add exercises.");
  };

  const addSetField = () => {
    setSets([...sets, { weight: 0, reps: 0 }]);
  };

  const updateSet = (
    index: number,
    field: "weight" | "reps",
    value: number
  ) => {
    const updated = [...sets];
    updated[index][field] = value;
    setSets(updated);
  };

  const handleSaveExercise = async () => {
    if (!workoutId || !selectedExerciseId) return;

    const now = new Date().toISOString();
    const exerciseLogId = uuidv4();

    await db.exercise_logs.add({
      id: exerciseLogId,
      workout_id: workoutId,
      exercise_id: selectedExerciseId,
      created_at: now,
      updated_at: now,
    });

    for (const set of sets) {
      await db.sets.add({
        id: uuidv4(),
        exercise_log_id: exerciseLogId,
        weight: set.weight,
        reps: set.reps,
        unit: "kg",
        created_at: now,
      });
    }

    alert("Exercise saved!");
    setSets([]);
  };

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Add Workout</h1>

      {!workoutId && (
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
      )}

      {workoutId && (
        <div className="mt-8 flex flex-col gap-4 max-w-md">
          <h2 className="font-semibold">Add Exercise</h2>

          <select
            value={selectedExerciseId}
            onChange={(e) => setSelectedExerciseId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Exercise</option>
            {exercises.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name}
              </option>
            ))}
          </select>

          <button
            onClick={addSetField}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            Add Set
          </button>

          {sets.map((set, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="number"
                placeholder="Weight"
                value={set.weight}
                onChange={(e) =>
                  updateSet(index, "weight", Number(e.target.value))
                }
                className="border p-2 rounded w-1/2"
              />
              <input
                type="number"
                placeholder="Reps"
                value={set.reps}
                onChange={(e) =>
                  updateSet(index, "reps", Number(e.target.value))
                }
                className="border p-2 rounded w-1/2"
              />
            </div>
          ))}

          <button
            onClick={handleSaveExercise}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Save Exercise
          </button>
        </div>
      )}
    </main>
  );
}