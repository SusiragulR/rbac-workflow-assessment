import { model, models, Schema } from "mongoose";

const TransactionSchema = new Schema(
	{
		status: String,
		uploadedBy: String,
		mode: String,
		amount: Number
	},
	{ timestamps: true }
);

const TransactionModel = models.Transaction || model("Transaction", TransactionSchema);

export default TransactionModel;
