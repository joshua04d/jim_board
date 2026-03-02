import { db } from "./db";
import { v4 as uuidv4 } from "uuid";

export const seedExercises = async () => {
  const count = await db.exercises.count();

  if (count > 0) {
    console.log("Exercises already seeded");
    return;
  }

  const now = new Date().toISOString();

  const predefined = [
    { name: "Bench Press", primary_muscle: "Chest" },
    { name: "Incline Bench Press", primary_muscle: "Chest" },
    { name: "Deadlift", primary_muscle: "Back" },
    { name: "Barbell Squat", primary_muscle: "Legs" },
    { name: "Leg Press", primary_muscle: "Legs" },
    { name: "Lat Pulldown", primary_muscle: "Back" },
    { name: "Overhead Press", primary_muscle: "Shoulders" },
    { name: "Lateral Raise", primary_muscle: "Shoulders" },
    { name: "Barbell Curl", primary_muscle: "Arms" },
    { name: "Skullcrusher", primary_muscle: "Arms" },
    { name: "Plank", primary_muscle: "Core" },
  ];

  await db.exercises.bulkAdd(
    predefined.map((ex) => ({
      id: uuidv4(),
      name: ex.name,
      primary_muscle: ex.primary_muscle,
      is_custom: false,
      created_at: now,
    }))
  );

  console.log("Predefined exercises seeded");
};