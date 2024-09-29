'use client';

import React, { useState } from 'react';
import connectMongoDb from '../../utils/connectMongo';
import TransactionModel from '../../models/TransModel';

interface Props {
    userRole: string;
    userId: String;
}

export default function AddTransactionForm({ userRole, userId }: Props) {
    const [amount, setAmount] = useState(0);
    const [mode, setMode] = useState('');

    const handleSubmit = async () => {
        const newTransaction = {
            mode,
            amount,
            uploadedBy: userId,
            status: 'pending'
        };

        console.log(newTransaction);

        try {
            await connectMongoDb();
            await TransactionModel.create(newTransaction);
        } catch (error) {
            console.log((error as Error).message);
        }
        await connectMongoDb();
        TransactionModel.create(newTransaction);
    };

    if (userRole === 'employee') {
        return (
            <section className="flex flex-col gap-y-4">
                <div>
                    <input
                        type="text"
                        id="mode"
                        name="mode"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter mode: cash/upi/cheque"
                    />
                </div>

                <div>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter amount"
                    />
                </div>

                <div
                    className="rounded p-3 bg-blue-500 text-white w-[25vw] text-center mx-auto hover:bg-green-500"
                    onClick={handleSubmit}
                >
                    Add Transaction
                </div>
            </section>
        );
    } else {
        return (
            <h1 className="text-center">
                Only employees have access to this session
            </h1>
        );
    }
}
