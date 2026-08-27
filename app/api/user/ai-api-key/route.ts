import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectToMongoDB } from '@/lib/dbConnect';
import { encrypt } from '@/lib/encryption';
import User from 'models/user';


export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { apiKey } = await req.json();
        if (!apiKey) {
            return NextResponse.json({ success: false, message: 'Key required' }, { status: 400 });
        }

        // Encrypt the API Key
        const encryptedKey = encrypt(apiKey);

        await connectToMongoDB();
        await User.findOneAndUpdate(
            { email: session.user.email },
            { geminiApiKey: encryptedKey }
        );

        return NextResponse.json({ success: true, message: 'API Key Saved Successfully' });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
