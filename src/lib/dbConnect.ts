import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global caching is used in Next.js to prevent exhausting the database connection limit due to hot reloading.
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToMongoDB() {
    // 1. If a connection is already available, use that.
    if (cached.conn) {
        console.log("🔄 Using cached MongoDB connection");
        return cached.conn;
    }

    // 2. If no promise is pending, then initiate a new connection.
    if (!cached.promise) {
        console.log("🎉 Creating new MongoDB connection promise...");

        cached.promise = mongoose
            .connect(MONGODB_URI!, {
                dbName: "StockViewApp", // Your DB name
                bufferCommands: false,
            })
            .then((mongooseInstance) => {
                console.log("✅ New MongoDB connection established successfully");
                return mongooseInstance.connection;
            })
            .catch((error) => {
                console.error("❌ MongoDB connection error:", error);
                cached.promise = null; // Reset the promise if an error occurs when the next call comes.
                throw error;
            });
    }

    // 3. Wait for the promise to resolve and store the connection in the cache.
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // Ensure promise is cleared on failure to allow retry
        throw e; // Re-throw the error to be handled by the caller
    }

    return cached.conn;
}
