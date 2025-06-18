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

    // Get the current user to check existing metadata
    const clerkUser = await clerkClient.users.getUser(userId);
    const currentRole = clerkUser.publicMetadata?.role as string | undefined;

    // Only set role if it doesn't exist (don't override existing roles)
    if (!currentRole) {
      // Update Clerk user metadata with patient role as default
      await clerkClient.users.updateUser(userId, {
        publicMetadata: {
          role: 'patient',
        },
      });
      
      console.log(`Set role 'patient' for user ${userId}`);
    } else {
      console.log(`User ${userId} already has role: ${currentRole}`);
    }

    // Sync with your database if needed
    // const dbResult = await syncUserToDatabase(userId, currentRole || 'patient');

    return new Response(JSON.stringify({ 
      success: true, 
      role: currentRole || 'patient' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal Server Error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}