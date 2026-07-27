// app/api/ai/analyze/route.ts (Next.js App Router)
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { decryptKey } from '@/lib/encryption';
import { getUserFromSession } from '@/lib/auth'; // NextAuth Session

export async function POST(req: NextRequest) {
    try {
        const session = await getUserFromSession(req);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { prompt, marketContextData } = await req.json();

        // 1. Fetch User's Encrypted Key from DB
        const user = await db.user.findUnique({ where: { id: session.userId } });

        if (!user?.aiSettings?.geminiApiKeyEncrypted) {
            return NextResponse.json({
                error: 'Please configure your Gemini API Key in Settings first.'
            }, { status: 400 });
        }

        // 2. Decrypt Key
        const userApiKey = decryptKey(user.aiSettings.geminiApiKeyEncrypted);

        // 3. Initialize Gemini Client with User's Key dynamically
        const genAI = new GoogleGenerativeAI(userApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // 4. Generate AI Response
        const systemPrompt = `You are NeoTerminal Financial AI. Analyze market data context: ${JSON.stringify(marketContextData)}`;
        const result = await model.generateContent([systemPrompt, prompt]);
        const responseText = result.response.text();

        return NextResponse.json({ success: true, analysis: responseText });

    } catch (error: any) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: error.message || 'AI Processing Failed' }, { status: 500 });
    }
}