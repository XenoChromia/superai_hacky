import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Enforce authentication
    await auth.protect();

    // ✅ Get user role from Clerk session
    const role = auth.session?.user.publicMetadata.role;

    // Redirect based on role
    const pathname = req.nextUrl.pathname;

    if (role === 'admin' && !pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    if (role === 'patient' && !pathname.startsWith('/patient')) {
      return NextResponse.redirect(new URL('/patient', req.url));
    }
  }

  return NextResponse.next();
});