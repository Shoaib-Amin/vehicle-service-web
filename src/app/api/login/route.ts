import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const requestBody = {
    email,
    password,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const responseData = await response.json()
    
    if (responseData.token) {

      const nextResponse = NextResponse.json(responseData);

      nextResponse.cookies.set('authToken', responseData.token, {
        httpOnly: false, // Prevents JS access to the cookie
        secure: process.env.NODE_ENV === 'production', // Only send the cookie over HTTPS in production
        sameSite: 'strict', // Prevent cross-site cookie leakage
        path: '/', // Cookie available for the entire site
        maxAge: 60 * 60 * 24, // 1 day expiration
      });

      return nextResponse;
    } else {
      return new NextResponse('Token not found in response', { status: 400 });
    }

  } catch (error) {
    console.error('Error while making request to Express server:', error);
    return new NextResponse('An error occurred while processing the request', { status: 500 });
  }

}