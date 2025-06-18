import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { patient_medical_history, patients, users } from "./db/schema"; // adjust path to your schema
import {eq} from "drizzle-orm";


export async function createUser({
                                   name,
                                   phone_number,
                                 }: {
  name: string;
  phone_number: string;
}) {
  const [newUser] = await db
    .insert(users)
    .values({
      name,
      phone_number,
      role: "patient"
    })
    .returning(); // returns inserted row(s)

  return newUser;
}

export async function getPatient() {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("No active Clerk user ID.");
  }

  const result = await db
    .select()
    .from(patients)
    .where(eq(patients.user_clerk_id, user.id))
    .limit(1)
    .execute();

  const patient = result[0];
  if (!patient) {
    throw new Error("Patient not found for this user.");
  }

  return patient;
}

export async function getMedicalRec() {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("No active Clerk user ID");
  }

  // Find patient by Clerk user ID
  const patientResult = await db
    .select()
    .from(patients)
    .where(eq(patients.user_clerk_id, user.id))
    .limit(1)
    .execute();

  const patient = patientResult[0];
  if (!patient) {
    throw new Error("Patient not found");
  }

  // Get all medical records for patient
  const medicalRecords = await db
    .select()
    .from(patient_medical_history)
    .where(eq(patient_medical_history.patient_id, patient.id))
    .execute();

  return medicalRecords;
}

export async function getUserRole(clerkID: any) {
  // Get the current authenticated user from Clerk

  // Query the database for the user's role using their Clerk user ID
  const result = await db
    .select({ role: users.role }) // Select only the 'role' column
    .from(users) // Query the 'users' table
    .where(eq(users.clerk_user_id, clerkID)) // Match the 'clerk_user_id' field
    .execute(); // Execute the query

  // Check if a user was found in the database
  if (result.length === 0) {
    throw new Error("User not found in the database");
  }

  // Extract the role from the first result
  const userRole = result[0]?.role;

  return userRole; // Return the user's role
}