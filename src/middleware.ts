import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
  '/patient(.*)',
  '/onboarding'
]);

// Define admin-only routes
const isAdminRoute = createRouteMatcher(['/admin(.*)']);

// Define patient-only routes  
const isPatientRoute = createRouteMatcher(['/patient(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Now access session data safely
  const userId = auth.userId;
  const sessionClaims = auth.sessionClaims;

  // Proceed with role checks only if user is authenticated
  if (userId && sessionClaims) {
    const role = sessionClaims.metadata?.role as string | undefined;
  }
  
  const pathname = req.nextUrl.pathname;

  // If accessing a protected route, enforce authentication
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // If user is authenticated, check role-based access
  if (userId && sessionClaims) {
    const role = sessionClaims.metadata?.role as string | undefined;

    // Admin role restrictions
    if (role === 'admin') {
      // Admin trying to access patient routes - redirect to admin
      if (isPatientRoute(req)) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      // Admin accessing root or other routes - redirect to admin dashboard
      if (pathname === '/' || pathname === '/onboarding') {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    }

    // Patient role restrictions
    if (role === 'patient') {
      // Patient trying to access admin routes - redirect to patient
      if (isAdminRoute(req)) {
        return NextResponse.redirect(new URL('/patient', req.url));
      }
      // Patient accessing root - redirect to patient dashboard
      if (pathname === '/') {
        return NextResponse.redirect(new URL('/patient', req.url));
      }
    }

    // If user has no role set and is accessing onboarding, allow it
    if (!role && pathname === '/onboarding') {
      return NextResponse.next();
    }

    // If user has no role and is not on onboarding, redirect to onboarding
    if (!role && pathname !== '/onboarding') {
      return NextResponse.redirect(new URL('/onboarding', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};