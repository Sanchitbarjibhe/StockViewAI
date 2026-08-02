import NextAuth, { NextAuthOptions } from "next-auth";
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

                    // 1. Check if user exists in MongoDB
                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        // 🟢 Create new user if not exists
                        await User.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            authProvider: "google",
                            role: "trader",
                            createdAt: new Date(),
                            lastLogin: new Date(),
                        });
                        console.log("New User Created in MongoDB:", user.email);
                    } else {
                        // 🟡 Update last login for existing user
                        await User.updateOne(
                            { email: user.email },
                            { $set: { lastLogin: new Date(), image: user.image } }
                        );
                        console.log("Existing User Logged In:", user.email);
                    }

                    return true; // Allow login
                } catch (error) {
                    console.error("Error saving user to DB:", error);
                    return false; // Reject login on DB error
                }
            }
            return true;
        },

        async session({ session }) {
            // To pass role or id from DB into the session
            if (session.user) {
                try {
                    await connectToMongoDB();
                    const dbUser = await User.findOne({ email: session.user.email });
                    if (dbUser) {
                        (session.user as any).id = dbUser._id.toString();
                        (session.user as any).role = dbUser.role || "trader";
                    }
                } catch (err) {
                    console.error("Session callback error:", err);
                }
            }
            return session;
        },
    },
    pages: {
        signIn: "/login", // Your custom login page path
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };