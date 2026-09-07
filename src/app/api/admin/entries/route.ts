import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToMongoDB } from '@/lib/dbConnect';
import { Waitlist } from '@/models/waitlist'; // किंवा तुमचा Data Model
import User from '@/models/user';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.role !== 'ADMIN') {
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
        }

        await connectToMongoDB();

        // 🟢 DB मधून Records fetch करणे
        const rawData = await Waitlist.find({}).sort({ createdAt: -1 });
        const users = await User.find({ email: { $in: rawData.map((item) => item.email) } })
            .select('email isBetaUser betaStatus')
            .lean();
        const usersByEmail = new Map(users.map((user) => [user.email, user]));

        // 🟢 Frontend ला आवश्यक असणाऱ्या registeredAt फॉर्मेटमध्ये Map करणे
        const formattedData = rawData.map((item) => ({
            _id: item._id,
            email: item.email,
            phone: item.phone || 'N/A',
            registeredAt: item.createdAt || new Date(),
            betaStatus: usersByEmail.get(item.email)?.betaStatus
                || (usersByEmail.get(item.email)?.isBetaUser ? 'ACTIVE' : item.isBetaUser ? 'INVITED' : 'NONE'),
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

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.role !== 'ADMIN') {
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
        }

        const { email, action } = await request.json();
        const normalizedEmail = String(email || '').trim().toLowerCase();
        if (!normalizedEmail || !['invite', 'revoke'].includes(action)) {
            return NextResponse.json({ success: false, error: 'Email and valid action are required' }, { status: 400 });
        }

        await connectToMongoDB();
        const isInvite = action === 'invite';

        await Waitlist.updateOne(
            { email: normalizedEmail },
            { $set: { isBetaUser: isInvite, status: isInvite ? 'INVITED' : 'WAITING' } }
        );
        await User.updateOne(
            { email: normalizedEmail },
            { $set: { isBetaUser: isInvite, betaStatus: isInvite ? 'INVITED' : 'NONE' } }
        );

        return NextResponse.json({ success: true, betaStatus: isInvite ? 'INVITED' : 'NONE' });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}