import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Check if the user has an authentication token in cookies
  const token = req.cookies.get('authToken');
  // If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Apply the middleware to all routes under /app/vehicle/** (e.g., /vehicle, /vehicle/details)
export const config = {
  matcher: ['/vehicle'],  // This will match all routes under /app/vehicle
};
