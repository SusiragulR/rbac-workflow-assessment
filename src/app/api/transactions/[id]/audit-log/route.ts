import { NextRequest, NextResponse } from 'next/server';
import { options } from '../../../../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import AuditModel from '../../../../../../models/AuditModel';
import connectMongo from '../../../../../../utils/connectMongo';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(options);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/');
    }

    try {
        await connectMongo();

        const { id } = params;

        let data;

        if (session.user?.role === 'admin') {
            data = await AuditModel.find({transactionId : id});
        }

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json(
            { success: false, message: (error as Error).message },
            { status: 500 }
        );
    }
}
