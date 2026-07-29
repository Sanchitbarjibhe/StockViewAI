// lib/db.ts
import mongoose, { Connection } from "mongoose";

// Declare a variable to store the cached database connection
let cachedConnection: Connection | null = null;

export async function connectToMongoDB() {
    // If a cached connection exists, return it instead of creating a new one
    if (cachedConnection) {
        console.log("Using cached db connection");
        return cachedConnection;
    }

    try {
        // Attempt to establish a new connection using your environment variable
        const cnx = await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'neoterminal' // Explicitly set the database name for clarity and consistency
        });

        // Cache the connection for future use
        cachedConnection = cnx.connection;

        console.log("New mongodb connection established");
        return cachedConnection;
    } catch (error) {
        // Log any connection errors immediately for debugging
        console.error("MongoDB connection error:", error);
        throw error;
    }
}
