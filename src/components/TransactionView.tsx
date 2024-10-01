'use client';
import React from 'react';

interface Transaction {
    _id?: string;
    status: string;
    uploadedBy: string;
    mode: string;
    amount: number;
}

interface ManagerViewProps {
    transaction: Transaction;
    userRole: string;
}

export default function ManagerView({
    transaction,
    userRole
}: ManagerViewProps) {
    const handleApprove = async () => {
        try {
            const response = await fetch(
                `/api/transactions/${transaction._id}/approve`,
                {
                    method: 'PUT'
                }
            );

            if (!response.ok) {
                throw new Error('Failed to approve transaction');
            }
        } catch (error) {
            console.error('Error approving transaction:', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch(
                `/api/transactions/${transaction._id}/reject`,
                {
                    method: 'PUT'
                }
            );

            if (!response.ok) {
                throw new Error('Failed to reject transaction');
            }
        } catch (error) {
            console.error('Error rejecting transaction:', error);
        }
    };
    return (
        <section className="flex w-full lg:w-[60vw] mx-auto p-2 flex flex-col">
            <div className="flex">
                <div
                    className={`py-auto border border-gray-400 w-full lg:w-[60vw] p-2`}
                >
                    <p>Id: {transaction._id}</p>
                    <p>Status: {transaction.status}</p>
                    <p>Uploaded By: {transaction.uploadedBy}</p>
                    <p>Mode : {transaction.mode}</p>
                </div>
                <div
                    className={`py-auto border border-gray-400 w-[12%] p-2 font-semibold py-auto`}
                >
                    ₹ {`${transaction.amount}`}
                </div>
            </div>
            {userRole === 'manager' && transaction.status === 'pending' && (
                <div className="justify-around border  border-t-0 border-gray-400 flex rounded-b-lg">
                    <div
                        className="bg-green-500 w-full text-center"
                        onClick={handleApprove}
                    >
                        Approve
                    </div>
                    <div
                        className="bg-red-500 w-full text-center"
                        onClick={handleReject}
                    >
                        Reject
                    </div>
                </div>
            )}
        </section>
    );
}
