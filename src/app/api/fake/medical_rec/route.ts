import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";
import { db } from "~/server/db";
import { patient_medical_history, patients } from "~/server/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import {eq} from "drizzle-orm";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user?.id) {
    console.warn("No active Clerk user ID found.");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find existing patient
  const patientResult = await db
    .select()
    .from(patients)
    .where(eq(patients.user_clerk_id, user.id))
    .limit(1)
    .execute();

  const patient = patientResult[0];
  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  // Check if a medical entry already exists
  const existingEntry = await db
    .select()
    .from(patient_medical_history)
    .where(eq(patient_medical_history.patient_id, patient.id))
    .limit(1)
    .execute();

  if (existingEntry.length > 0) {
    return NextResponse.json(existingEntry[0]);
  }

  const entryTypes = [
    "Medical History",
    "Recent Appointment",
    "Scheduled Appointment",
  ];

  const statuses = [
    "routine",
    "preventive",
    "Completed",
    "Reschedule",
    "Priority",
  ];

  const appointmentTime =
    faker.helpers.arrayElement(["", "09:00", "10:30", "14:00", "16:00"]);
  const fakeMedicalHistory = {
    patient_id: patient.id,
    entry_type: faker.helpers.arrayElement(entryTypes),
    entry_date: faker.date.between({
  from: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), // 1 year ago
  to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),   // 30 days ahead
  }).toISOString().split("T")[0],
    description: faker.lorem.sentence(5),
    practitioner: faker.name.fullName(),
    notes: faker.lorem.sentences(2),
    status: faker.helpers.arrayElement(statuses),
    appointment_time: appointmentTime,
  };

  // Insert the fake medical history into the database
const [inserted] = await db
  .insert(patient_medical_history)
  .values(fakeMedicalHistory)
  .returning();

return NextResponse.json(inserted, { status: 201 });
}
