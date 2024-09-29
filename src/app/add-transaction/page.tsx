import React from 'react';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import AddTransactionForm from '@/components/AddTransactionForm';

export default async function page() {
    const session = await getServerSession(options);
    console.log(session?.user);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/');
    }

    return (
        <section className="flex flex-col items-center">
            <h3 className="mt-10 mb-5 font-semibold">Add New Transaction</h3>
            <div className="w-[60%] mx-auto">
                <AddTransactionForm
                    userRole={session.user.role}
                    userId={session.user.email}
                />
            </div>
        </section>
    );
}
