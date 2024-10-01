import mongoose from 'mongoose';

const AuditSchema = new mongoose.Schema(
    {
        role: String,
        updatedBy: String,
        status: String,
        mode: String,
        amount: Number,
        transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' , required: true }
    },
    { timestamps: true }
);

const AuditModel =
    mongoose.models?.Audit || mongoose.model('Audit', AuditSchema);

export default AuditModel;
