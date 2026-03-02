import Dexie, { Table } from "dexie";

/* ---------------- TYPES ---------------- */

export interface Workout {
  id: string;
  date: string;
  notes?: string;
  duration_minutes?: number;
  session_type?: string;
  fatigue_rating?: number;
  created_at: string;
  updated_at: string;
}

export interface Exercise {
  id: string;
  name: string;
  primary_muscle: string;
  secondary_muscle?: string;
  equipment_type?: string;
  is_custom: boolean;
  created_at: string;
}

export interface ExerciseLog {
  id: string;
  workout_id: string;
  exercise_id: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface SetEntry {
  id: string;
  exercise_log_id: string;
  weight: number;
  reps: number;
  unit: "kg" | "lbs";
  rpe?: number;
  is_warmup?: boolean;
  created_at: string;
}

export interface UserSettings {
  id: string;
  preferred_unit: "kg" | "lbs";
  theme?: string;
  created_at: string;
  updated_at: string;
}

/* ---------------- DATABASE ---------------- */

class FitnessDB extends Dexie {
  workouts!: Table<Workout>;
  exercises!: Table<Exercise>;
  exercise_logs!: Table<ExerciseLog>;
  sets!: Table<SetEntry>;
  user_settings!: Table<UserSettings>;

  constructor() {
    super("FitnessDashboardDB");

    this.version(1).stores({
      workouts: "id, date",
      exercises: "id, name, primary_muscle",
      exercise_logs: "id, workout_id",
      sets: "id, exercise_log_id",
      user_settings: "id",
    });
  }
}

export const db = new FitnessDB();