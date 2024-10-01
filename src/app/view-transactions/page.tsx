import React from 'react';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import ViewTransactions from '@/components/ViewTransactions';
import connectMongo from '../../../utils/connectMongo';

export default async function page() {
    const session = await getServerSession(options);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/view-transactions');
    }

    await connectMongo()

    let transactions;

    try {
        const response = await fetch(
            `https://susiragul-rbac-workflow-assessment.vercel.app/api/transactions?userRole=${session.user?.role}&userId=${session.user?.email}`,
            { method: 'GET' }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch transactions');
        }

        const { data } = await response.json();
        transactions = data;
        //console.log('Fetched Transactions:', transactions);
    } catch (error) {
        console.error('Error:', error);
    }

    return (
            <ViewTransactions transactions={transactions} userRole={`${session.user.role}`}/>
    );
}
