import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToMongoDB } from '@/lib/dbConnect';
import { decryptKey } from '@/lib/encryption';
import User from 'models/user';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, conclusion: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectToMongoDB();
        const user = await User.findOne({ email: session.user.email }).select('aiProvider encryptedApiKey');
        if (!user?.encryptedApiKey) {
            return NextResponse.json(
                { success: false, conclusion: 'Please save the AI API key in Settings first.' },
                { status: 400 }
            );
        }

        if (user.aiProvider !== 'gemini') {
            return NextResponse.json(
                { success: false, conclusion: 'Currently, only the Gemini provider is available for AI conclusion.' },
                { status: 400 }
            );
        }

        const apiKey = decryptKey(user.encryptedApiKey);
        const genAI = new GoogleGenerativeAI(apiKey);
        const { marketData, userPrompt } = await req.json();
        const systemInstruction = `
    You are an expert Institutional Market Analyst & Tape Reader for the Indian Stock Market (NSE/BSE).
    Analyze the provided live market data and answer the user query concisely in bullet points or short paragraphs.
    Focus on key support/resistance levels, market bias (Bullish/Bearish), and sector strength.
    `;

        const userMessage = `
    User Query: ${userPrompt || "Give me today's institutional market summary and bias."}

    Current Live Market Snapshot to analyze:
    ${JSON.stringify(marketData, null, 2)}`;

        const model = genAI.getGenerativeModel({
            model: 'gemini-3.6-flash',
            systemInstruction: systemInstruction,
        });

        const result = await model.generateContent(userMessage);
        const response = result.response;
        const conclusion = response.text();

        return NextResponse.json({ success: true, conclusion: conclusion });
    } catch (error: any) {
        // Log the detailed error for debugging
        console.error('❌ Gemini API Error:', error);

        // Send a generic but helpful error message to the client in Marathi
        return NextResponse.json(
            { success: false, conclusion: `AI ॲनालिसिस अयशस्वी झाले. सर्व्हर एरर: ${error?.message || 'Unknown error'}` },
            { status: 500 }
        );
    }
}