import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get Clerk user ID from auth context
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if role is already set
    const clerkUser = await clerkClient.users.getUser(userId);
    const currentRole = clerkUser.publicMetadata?.role as string | undefined;

    if (currentRole !== 'patient') {
      // Update Clerk user metadata
      await clerkClient.users.updateUser(userId, {
        publicMetadata: {
          role: 'patient',
        },
      });
    }

    // Sync with your database (optional)
    // const dbResult = await syncUserToDatabase(userId, 'patient');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}