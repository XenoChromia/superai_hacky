// pages/api/patients/fake.js
import { currentUser } from "@clerk/nextjs/server";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";
import { db } from "~/server/db";  // adjust to your actual path
import { patients } from "~/server/db/schema"; // your patients table schema
import {eq} from "drizzle-orm";

export async function GET(req: any, res: any) {
  const user = await currentUser();

  if (!user?.id) {
      console.warn('No active Clerk user ID found. Cannot synchronize.');
      return false;
    }

  

  try {
    const existing = await db
      .select()
      .from(patients)
      .where(eq(patients.user_clerk_id, user.id))
      .limit(1)
      .execute();

    if (existing.length > 0) {
      // Patient already exists, return it
      return NextResponse.json(existing[0], { status: 200 });
    }
    const fakePatient = {
  user_clerk_id: user.id,

  cardiovascular_bp_systolic: faker.number.int({ min: 90, max: 140 }),
  cardiovascular_bp_diastolic: faker.number.int({ min: 60, max: 90 }),
  cardiovascular_hr_bpm: faker.number.int({ min: 50, max: 100 }),

  physical_activity_steps: faker.number.int({ min: 0, max: 20000 }),

  physical_activity_distance_km: faker.number
    .float({ min: 0, max: 20 })
    .toFixed(1),

  health_risk_score: faker.number.int({ min: 0, max: 100 }),

  health_risk_status: faker.helpers.arrayElement([
    "Excellent",
    "Low Risk",
    "Moderate Risk",
    "High Risk",
  ]),

  medications_active_count: faker.number.int({ min: 0, max: 10 }),
      physical_assessment_cardiovascular: faker.helpers.arrayElement([
        "Normal",
        "Abnormal",
        "Needs Review",
      ]),
      physical_assessment_respiratory: faker.helpers.arrayElement([
        "Normal",
        "Abnormal",
        "Needs Review",
      ]),
      physical_assessment_neurological: faker.helpers.arrayElement([
        "Normal",
        "Abnormal",
        "Needs Review",
      ]),
    };

    // Insert fake data into the database
    const [insertedPatient] = await db
      .insert(patients)
      .values(fakePatient)
      .returning();

    return NextResponse.json(insertedPatient, { status: 201 });
    } catch (error) {
    console.error("Error inserting fake patient:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );

  }
}
