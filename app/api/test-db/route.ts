// app/api/test-db/route.ts
import { connectToMongoDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToMongoDB();
        // If it reaches here, the connection is successful
        return NextResponse.json({ message: "Successfully connected to MongoDB" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to connect to database" }, { status: 500 });
    }
}
