import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {

        const response = NextResponse.json({ message: "Logged out successfully" });

        // Clear the token by setting its expiry date to a past time
        response.cookies.set('authToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            expires: new Date(0), // Expire the cookie immediately
        });

        return NextResponse.redirect(new URL('/', req.url));  // Or use '/home' depending on your flow
    } catch (error) {
        console.error('Error during logout:', error);
        return new NextResponse('An error occurred while logging out', { status: 500 });
    }
}
