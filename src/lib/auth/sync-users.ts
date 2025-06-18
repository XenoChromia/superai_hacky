import {auth, currentUser} from "@clerk/nextjs/server";
import {db} from "~/server/db";
import {users} from "~/server/db/schema";
import {eq} from "drizzle-orm";

// This utility function will synchronize a Clerk user with our Supabase database
export async function syncUserWithDatabase() {
  try {
    const user = await currentUser();

    if (!user?.id) {
      console.warn('No active Clerk user ID found. Cannot synchronize.');
      return false;
    }

    // 1. Check if user already exists in our database using Clerk's unique ID
    const existingUser = await db.select()
      .from(users)
      .where(eq(users.clerk_user_id, user.id))
      .limit(1);

    // 2. If user doesn't exist, create them
    if (!existingUser.length) {
      console.log(`Clerk user ${user.id} not found in DB. Creating new record.`);

      await db.insert(users).values({
        clerk_user_id: user.id,
        name: user.firstName + (user.lastName ? " " + user.lastName : ""),
        phone_number: user.phoneNumbers?.[0]?.phoneNumber ?? null,
        role: "patient"
      });

      console.log(`User ${user.id} synchronized with database successfully.`);
    } else {
      console.log(`User ${user.id} already exists in DB. No action needed.`);
    }

    return true;
  } catch (error) {
    console.error('Error synchronizing user with database:', error);
    return false;
  }
}