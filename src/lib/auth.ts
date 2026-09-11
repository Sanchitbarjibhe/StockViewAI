import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToMongoDB } from '@/lib/dbConnect';
import User from "@/models/user";
import { Waitlist } from '@/models/waitlist';

// Extend NextAuth types to include role
declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string;
            isBetaUser?: boolean;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
        isBetaUser?: boolean;
    }
}

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("Missing GOOGLE_CLIENT_ID environment variable");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET environment variable");
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'openid email profile',
                    prompt: 'consent',
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    await connectToMongoDB();

                    const email = user.email?.toLowerCase();
                    const existingUser = await User.findOne({ email });
                    const waitlistEntry = email ? await Waitlist.findOne({ email }) : null;
                    const hasBetaInvite = existingUser?.isBetaUser === true || waitlistEntry?.isBetaUser === true;

                    if (!existingUser) {
                        await User.create({
                            name: user.name,
                            email,
                            image: user.image,
                            authProvider: 'google',
                            role: 'USER', // Default role 'USER' set kela ahe
                            isBetaUser: hasBetaInvite,
                            betaStatus: hasBetaInvite ? 'ACTIVE' : 'NONE',
                            createdAt: new Date(),
                            lastLogin: new Date(),
                        });
                        console.log("New User Created in MongoDB:", user.email);
                    } else {
                        await User.updateOne(
                            { email },
                            {
                                $set: {
                                    lastLogin: new Date(),
                                    image: user.image,
                                    ...(hasBetaInvite ? { isBetaUser: true, betaStatus: 'ACTIVE' } : {}),
                                }
                            }
                        );
                        if (hasBetaInvite) {
                            await Waitlist.updateOne({ email }, { $set: { status: 'ACTIVE', isBetaUser: true } });
                        }
                        console.log("Existing User Logged In:", user.email);
                    }

                    return true;
                } catch (error) {
                    console.error("Error saving user to DB:", error);
                    return false;
                }
            }
            return true;
        },

        // 1. JWT तयार होताना DB मधून Role उचला
        async jwt({ token, user }) {
            if (user) {
                await connectToMongoDB();
                const dbUser = await User.findOne({ email: user.email });
                if (dbUser) {
                    token.role = dbUser.role; // DB मधील 'ADMIN' token ला जोडला
                    token.isBetaUser = dbUser.isBetaUser === true && dbUser.betaStatus !== 'NONE';
                    token.email = dbUser.email;
                    token.picture = dbUser.image;
                }
            }
            return token;
        },

        // 2. JWT मधील Role Session मध्ये Pass करा (जेणेकरून Frontend/Console ला दिसेल)
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.isBetaUser = token.isBetaUser === true;
                session.user.email = token.email || session.user.email;
                session.user.image = token.picture || null;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
