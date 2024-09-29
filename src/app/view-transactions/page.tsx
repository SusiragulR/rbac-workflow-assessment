import React from 'react';
import connectMongoDb from '../../../utils/connectMongo';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import TransactionModel from '../../../models/TransModel';

export default async function page() {
    try {
        await connectMongoDb();
    } catch (error) {
        console.log((error as Error).message);
    }

    const session = await getServerSession(options);

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/');
    }

    if (session.user.role == 'admin') {
        const auditData = await TransactionModel.find({});
        return (
            <section>
                {auditData.map((article) => (
                    <article key={article.id} className="border p-4 mb-4">
                        <h2 className="text-xl font-bold">{article.amount}</h2>
                        <p>{article.status}</p>
                        <p>{article.updatedBy}</p>
                    </article>
                ))}
            </section>
        );
    } else if (session.user.role == 'employee') {
        const auditData = await TransactionModel.find({
            uploadedBy: session.user.id
        });
        return (
            <section>
                {auditData.map((article) => (
                    <article key={article.id} className="border p-4 mb-4">
                        <h2 className="text-xl font-bold">{article.amount}</h2>
                        <p>{article.status}</p>
                        <p>{article.updatedBy}</p>
                    </article>
                ))}
            </section>
        );
    } else {
        return <div>Only managers and employees have access</div>;
    }
}
