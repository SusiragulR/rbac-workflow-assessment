'use client';

import React, { useState } from 'react';

interface Props {
    userRole: string;
    userId: string;
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

        setMode('');
        setAmount(0);

        console.log(newTransaction);

        try {
            await fetch('/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTransaction)
            });
        } catch (error) {
            console.log(error);
        }
    };

    if (userRole === 'employee') {
        return (
            <section className="flex flex-col gap-y-4">
                <h3 className="mt-10 mb-5 text-xl text-center">
                    Add New Transaction
                </h3>
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
                        value={amount === 0 ? '' : amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter amount"
                    />
                </div>

                <div
                    className="rounded p-3 bg-blue-500 text-white w-[25vw] text-center mx-auto hover:bg-green-500"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    Add
                </div>
            </section>
        );
    } else {
        return (
            <div className="flex items-center justify-center min-h-screen text-2xl">
                Only employees have access to this session
            </div>
        );
    }
}
