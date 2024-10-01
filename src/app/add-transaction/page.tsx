import React from 'react';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import AddTransactionForm from '@/components/AddTransactionForm';

export default async function page() {
    const session = await getServerSession(options);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/');
    }

    return (
        <section className="flex flex-col items-center">
            <div className="w-[60%] mx-auto">
                <AddTransactionForm
                    userRole={session.user.role}
                    userId={session.user.email}
                />
            </div>
        </section>
    );
}
