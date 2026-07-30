import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/db';
import MvpEntry from 'models/mvpentry';

export const revalidate = 0;

export async function GET() {
  try {
    await connectToMongoDB();
    const entries = await MvpEntry.find({}).sort({ registeredAt: -1 }).lean();
    return NextResponse.json({ success: true, data: entries });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}