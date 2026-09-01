import { NextResponse } from 'next/server';
import { connectToMongoDB } from 'lib/dbConnect';
import { Waitlist } from 'models/waitlist';


export async function POST(request: Request) {
    try {
        await connectToMongoDB();

        console.log("✅ MongoDB Connected Successfully!");

        const body = await request.json();
        console.log("📥 Received Data from Frontend:", body);

        const { name, email, phone, broker } = body;

        // Validate required fields first
        if (!name || !email || !phone) {
            return NextResponse.json({ message: 'Name, email, and phone are required' }, { status: 400 });
        }

        // Check for existing WaitList before attempting to create
        const existingWaitList = await Waitlist.findOne({ email });
        if (existingWaitList) {
            return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
        }
        const appSource = process.env.APP_SOURCE || process.env.NEXT_PUBLIC_APP_SOURCE || 'BETA';
        // 🟢 1. Vercel Env वरून Automatic Source ओळखा (Default 'BETA' राहील)
        const currentEnv = appSource === 'LIVE' ? 'LIVE' : 'BETA';

        // 🟢 2. Dynamic Source आणि Flag सोबत Mongo मध्ये Save करा
        const newWaitList = await Waitlist.create({
            name,
            email,
            phone,
            broker: broker || 'Other',
            environment: currentEnv,                // 🟢 DB Schema नुसार 'BETA' किंवा 'LIVE'
            isBetaUser: currentEnv === 'BETA',     // 🟢 Beta वरून आला तर true, Live वरून false
            status: 'WAITING'
        });

        console.log("💾 Saved to DB:", newWaitList);
        return NextResponse.json({ message: 'WaitList successful', data: newWaitList }, { status: 201 });

    } catch (error: any) {
        console.error('WaitList error:', error);
        if (error.code === 11000) { // Duplicate key error for unique fields
            return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
        }
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}