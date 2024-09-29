import { model, Schema } from 'mongoose';

const AuditSchema = new Schema(
    {
        role: String,
        uploadedBy: String,
        updatedBy: String,
        status: String,
        mode: String,
        amount: Number
    },
    { timestamps: true }
);

const AuditModel = model('Audit', AuditSchema);

export default AuditModel;
