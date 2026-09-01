import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToMongoDB } from '@/lib/dbConnect';
import { encryptKey } from '@/lib/encryption';
import User from '@/models/user';


export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { apiKey, provider } = await req.json();
        if (!apiKey) {
            return NextResponse.json({ success: false, message: 'Key required' }, { status: 400 });
        }

        if (!['gemini', 'claude', 'openai'].includes(provider)) {
            return NextResponse.json({ success: false, message: 'Unsupported AI provider' }, { status: 400 });
        }

        // Encrypt the API Key
        const encryptedKey = encryptKey(apiKey);

        await connectToMongoDB();
        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { aiProvider: provider, encryptedApiKey: encryptedKey }
        );

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'API Key Saved Successfully' });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
