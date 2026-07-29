import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/db';
import Mvpentry from 'models/mvpentry';



export async function POST(request: Request) {
    try {
        await connectToMongoDB();

        console.log("✅ MongoDB Connected Successfully!"); // Terminal वर दिसेल

        const body = await request.json();
        console.log("📥 Received Data from Frontend:", body);

        const { name, email, phone } = body;

        // Validate required fields first
        if (!name || !email || !phone) {
            return NextResponse.json({ message: 'Name, email, and phone are required' }, { status: 400 });
        }

        // Check for existing Mvpentry before attempting to create
        const existingMvpentry = await Mvpentry.findOne({ email });
        if (existingMvpentry) {
            return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
        }

        const newMvpentry = await Mvpentry.create({ name, email, phone });
        console.log("💾 Saved to DB:", newMvpentry);
        return NextResponse.json({ message: 'Mvpentry successful', data: newMvpentry }, { status: 201 });
    } catch (error: any) {
        console.error('Mvpentry error:', error);
        if (error.code === 11000) { // Duplicate key error for unique fields
            return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
        }
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}