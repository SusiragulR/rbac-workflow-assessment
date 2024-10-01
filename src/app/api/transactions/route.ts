import { NextRequest, NextResponse } from 'next/server';
import { options } from '../../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import TransactionModel from '../../../../models/TransModel';
import AuditModel from '../../../../models/AuditModel';
import connectMongo from '../../../../utils/connectMongo';

export async function POST(req: NextRequest) {
    try {
        await connectMongo();

        const body = await req.json();
        const { status, uploadedBy, mode, amount, userRole } = body;

        if (!mode || !amount || !uploadedBy) {
            return NextResponse.json(
                { success: false, message: 'All fields are required' },
                { status: 400 }
            );
        }

        const newTransaction = await TransactionModel.create({
            status,
            uploadedBy,
            mode,
            amount
        });

        console.log('newTransaction: ', newTransaction);
        console.log(newTransaction._id);

        const newAudit = await AuditModel.create({
            role: userRole,
            updatedBy: uploadedBy,
            status,
            mode,
            amount,
            transactionId: newTransaction._id as string
        });

        console.log(newAudit);
        console.log(newAudit.transactionId);

        return NextResponse.json(
            { success: true, data: newTransaction },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating transaction:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectMongo();

        const { searchParams } = new URL(req.url);
        const userRole = searchParams.get('userRole');
        const userId = searchParams.get('userId');

        let data;

        if (userRole === 'employee') {
            data = await TransactionModel.find({ uploadedBy: userId });
        } else {
            data = await TransactionModel.find({});
        }

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
