import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToMongoDB } from '@/lib/dbConnect';
import User from "models/user";

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
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    await connectToMongoDB();

                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        await User.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            authProvider: 'google',
                            role: 'USER', // Default role 'USER' set kela ahe
                            createdAt: new Date(),
                            lastLogin: new Date(),
                        });
                        console.log("New User Created in MongoDB:", user.email);
                    } else {
                        await User.updateOne(
                            { email: user.email },
                            { $set: { lastLogin: new Date(), image: user.image } }
                        );
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
                debugger;
                const dbUser = await User.findOne({ email: user.email });
                if (dbUser) {
                    token.role = dbUser.role; // DB मधील 'ADMIN' token ला जोडला
                }
            }
            return token;
        },

        // 2. JWT मधील Role Session मध्ये Pass करा (जेणेकरून Frontend/Console ला दिसेल)
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
