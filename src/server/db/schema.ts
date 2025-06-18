// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `app_${name}`);

export const users = createTable(
  "users",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    clerk_user_id: d.varchar({ length: 50 }).notNull().unique(),
    name: d.varchar({ length: 256 }),
    phone_number: d.varchar("phone_number", { length: 15 }),
    role: d.varchar("role"),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)]
);

export const patients = createTable(
  "patients",
  (d) => ({
    id: d.serial("id").primaryKey(), // Auto-incrementing primary key for the patient
    user_clerk_id: d.varchar("user_clerk_id", { length: 50 })
      .notNull()
      .references(() => users.clerk_user_id, { onDelete: "cascade" }), // Link to clerk_user_id in users table
    
    // Cardiovascular metrics
    cardiovascular_bp_systolic: d.integer("cardiovascular_bp_systolic"), // e.g., 118 mmHg
    cardiovascular_bp_diastolic: d.integer("cardiovascular_bp_diastolic"), // e.g., 78 mmHg
    cardiovascular_hr_bpm: d.integer("cardiovascular_hr_bpm"), // e.g., 72 BPM

    // Physical Activity metrics
    physical_activity_steps: d.integer("physical_activity_steps"), // e.g., 8547 steps
    physical_activity_distance_km: d.varchar("physical_activity_distance_km", { length: 10 }), // Stored as varchar to handle '6.2 km' easily, or could be numeric if always float

    // Health Risk Score
    health_risk_score: d.integer("health_risk_score"), // e.g., 94
    health_risk_status: d.varchar("health_risk_status", { length: 50 }), // e.g., 'Excellent', 'Low Risk'

    // Medications
    medications_active_count: d.integer("medications_active_count"), // e.g., 3 Active

    // Physical Assessment (from the diagram)
    physical_assessment_cardiovascular: d.varchar("physical_assessment_cardiovascular", { length: 50 }), // e.g., 'Normal'
    physical_assessment_respiratory: d.varchar("physical_assessment_respiratory", { length: 50 }), // e.g., 'Normal'
    physical_assessment_neurological: d.varchar("physical_assessment_neurological", { length: 50 }), // e.g., 'Normal'

    // Timestamps
    last_updated_at: d.timestamp("last_updated_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    created_at: d.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updated_at: d.timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  })
);

// 2. Patient Medical History Table: Stores all medical history, recent, and scheduled appointments
export const patient_medical_history = createTable(
  "patient_medical_history",
  (d) => ({
    id: d.serial("id").primaryKey(), // Auto-incrementing primary key for each medical entry
    patient_id: d.integer("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }), // Link to the patients table

    entry_type: d.varchar("entry_type", { length: 50 }).notNull(), // e.g., 'Medical History', 'Recent Appointment', 'Scheduled Appointment'
    entry_date: d.date("entry_date").notNull(), // Date of the medical event or appointment
    description: d.varchar("description", { length: 256 }).notNull(), // Description of the event, e.g., 'Annual Physical Examination', 'Dental Prophylaxis'
    practitioner: d.varchar("practitioner", { length: 256 }), // Name of the doctor/nurse/dentist
    notes: d.text("notes"), // Additional details, e.g., 'Normal findings', 'Within normal range', 'Administered successfully'
    status: d.varchar("status", { length: 50 }), // e.g., 'routine', 'preventive', 'Completed', 'Reschedule', 'Priority'
    appointment_time: d.varchar("appointment_time", { length: 10 }), // Time of the appointment, if applicable (e.g., '14:00', '09:00')

    created_at: d.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updated_at: d.timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  })
);

