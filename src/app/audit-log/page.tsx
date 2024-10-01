import React from 'react';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import AuditModel from '../../../models/AuditModel';

interface Audit{
        _id: string,
        role: string,
        updatedBy: string,
        status: string,
        mode: string,
        amount: number
    }
export default async function page() {
    const session = await getServerSession(options);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/');
    }

    if (session.user.role == 'admin') {
        const auditData = await AuditModel.find({});
        return (
            <section>
                {auditData.map((article: Audit) => (
                    <article key={article._id} className="border p-4 mb-4">
                        <h2 className="text-xl">{article.updatedBy}</h2>
                        <p>{article.status}</p>
                        <p>₹ {`${article.amount}`}</p>
                    </article>
                ))}
            </section>
        );
    } else {
        return (
            <div className="flex items-center justify-center min-h-screen text-2xl">
                Only admins have access
            </div>
        );
    }
}
