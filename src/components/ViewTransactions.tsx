"use client"
import React, { useState } from 'react'
import ManagerView from './TransactionView';

interface Transaction {
    _id?: any;
    status: String;
    uploadedBy: String;
    mode: String;
    amount: Number;
}

interface ViewTransactionsProps {
    transactions: Transaction[]; // Expecting an array of transactions
    userRole: string; // Assuming userRole is passed for future use
}

export default function ViewTransactions({ transactions, userRole }: ViewTransactionsProps) {
  const [filter, setFilter] = useState('all');

    // Filter transactions based on the selected status
    const filteredTransactions = transactions?.filter((transaction: Transaction) => {
        if (filter === 'all') return true; // Show all transactions
        return transaction.status === filter; // Filter based on selected status
    });

    return (
        <section>
            <div className="px-auto mb-4 mt-2">
                <label className="mr-2">Filter:</label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'all' | 'pending' | 'Approved' | 'Rejected')}
                    className="border border-gray-300 rounded-md p-2"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            {filteredTransactions && filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction: Transaction) => (
                    <ManagerView transaction={transaction} userRole={userRole} key={transaction._id}/>
                ))
            ) : (
                <div className="flex items-center justify-center min-h-screen text-2xl">
                    No transactions found
                </div>
            )}
        </section>
    );
}
