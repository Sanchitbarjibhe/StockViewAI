import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { NextRequest } from 'next/server';

export const authOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
    },
    session: {
        strategy: 'jwt' as const,
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

/**
 * Utility function to get the server-side session.
 * This abstracts away the direct usage of `auth()` in your API routes.
 */
export async function getUserFromSession(req?: NextRequest) {
    // The `auth` function can be called without arguments to get the session.
    // The `req` is not strictly needed for the default setup but good practice to have.
    return auth();
}
