import { NextRequest, NextResponse } from 'next/server';
import { options } from '../../../../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import TransactionModel from '../../../../../../models/TransModel';
import AuditModel from '../../../../../../models/AuditModel';
import connectMongo from '../../../../../../utils/connectMongo';

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    try {
        // Connect to MongoDB
        await connectMongo();

        // Extract transaction ID from the dynamic route
        const { id } = params;

        // Log the transaction ID for debugging
        console.log('Transaction ID:', id);

        // Check if transaction exists
        const transaction = await TransactionModel.findById(id);
        if (!transaction) {
            return NextResponse.json(
                { success: false, message: 'Transaction not found' },
                { status: 404 }
            );
        }

        // Update transaction status to 'approved'
        transaction.status = 'Approved';
        await transaction.save();

        const newAudit = {
            role: 'manager',
            updatedBy: userId,
            status: 'Approved',
            mode: transaction.mode,
            amount: transaction.amount,
            transactionId: transaction._id
        };

        AuditModel.create(newAudit);

        // Respond with the updated transaction
        return NextResponse.json(
            { success: true, data: transaction },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error approving transaction:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
