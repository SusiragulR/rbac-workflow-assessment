import React, { useState } from 'react';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import ViewTransactions from '@/components/ViewTransactions';

export default async function page() {
    const session = await getServerSession(options);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/view-transactions');
    }

    let transactions;

    try {
        const response = await fetch(
            `http://localhost:3000/api/transactions?userRole=${session.user?.role}&userId=${session.user?.email}`,
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
