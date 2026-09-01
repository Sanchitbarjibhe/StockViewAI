import { NextResponse } from 'next/server';
import { connectToMongoDB } from '@/lib/dbConnect';
import { Waitlist } from '@/models/waitlist'; // किंवा तुमचा Data Model

export async function GET() {
    try {
        await connectToMongoDB();

        // 🟢 DB मधून Records fetch करणे
        const rawData = await Waitlist.find({}).sort({ createdAt: -1 });

        // 🟢 Frontend ला आवश्यक असणाऱ्या registeredAt फॉर्मेटमध्ये Map करणे
        const formattedData = rawData.map((item) => ({
            _id: item._id,
            email: item.email,
            phone: item.phone || 'N/A',
            registeredAt: item.createdAt || new Date(),
        }));

        return NextResponse.json({
            success: true,
            data: formattedData,
        });
    } catch (error: any) {
        console.error('❌ Admin Entries Fetch Error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}