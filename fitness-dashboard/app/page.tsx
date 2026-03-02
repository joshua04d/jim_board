// export default function Home() {
//   return (
//     <main className="flex min-h-screen items-center justify-center">
//       <h1 className="text-3xl font-bold">
//         Fitness Dashboard Phase 1
//       </h1>
//     </main>
//   );
// }

"use client";

import { useEffect } from "react";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  useEffect(() => {
    const testDB = async () => {
      await db.workouts.add({
        id: uuidv4(),
        date: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      const workouts = await db.workouts.toArray();
      console.log("Workouts:", workouts);
    };

    testDB();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">
        DB Test - Check Console
      </h1>
    </main>
  );
}