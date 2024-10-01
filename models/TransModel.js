import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
    {
        status: String,
        uploadedBy: String,
        mode: String,
        amount: Number
    },
    { timestamps: true }
);

const TransactionModel = mongoose.models?.Transaction || mongoose.model('Transaction', TransactionSchema);

export default TransactionModel;