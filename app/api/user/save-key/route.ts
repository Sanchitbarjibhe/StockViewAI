import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { email, apiKey } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // User शोधून API Key Update कर किंवा नवीन User तयार कर (Upsert)
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { geminiApiKey: apiKey },
            { new: true, upsert: true }
        );

        return NextResponse.json({ success: true, message: 'API Key Saved Successfully!' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}