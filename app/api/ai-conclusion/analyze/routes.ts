// app/api/ai/analyze/route.ts (Next.js App Router)
import { NextRequest, NextResponse } from 'next/server';
import { decryptKey } from '@/lib/encryption';
import 'firebase/firestore';
import { GoogleGenAI } from '@google/genai';
import { getUserFromSession } from '@/lib/auth'; // NextAuth Session
import { db } from '@/lib/firebase';

export async function POST(req: NextRequest) {
    try {
        const session = await getUserFromSession(req);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { prompt, marketContextData } = await req.json();

        // 1. Fetch User's Encrypted Key from DB
        // 1. Fetch User's Encrypted Key from DB (v8 Chaining Syntax)
        const userDocSnap = await db.collection('users').doc(session.userId).get();
        const user = userDocSnap.exists ? userDocSnap.data() : null;

        if (!user?.aiSettings?.geminiApiKeyEncrypted) {

            return NextResponse.json({
                error: 'Please configure your Gemini API Key in Settings first.'
            }, { status: 400 });
        }

        // 2. Decrypt Key
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const systemPrompt = `You are NeoTerminal Financial AI. Analyze market data context: ${JSON.stringify(marketContextData)}`;
        const fullPrompt = `${systemPrompt}\n\n${prompt}`;

        // 3. Initialize Gemini Client with User's Key dynamically
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullPrompt,
        });

        // 4. Generate AI Response
        const responseText = result.text;

        return NextResponse.json({ success: true, analysis: responseText });

    } catch (error: any) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: error.message || 'AI Processing Failed' }, { status: 500 });
    }
}