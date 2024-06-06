import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  text: string;
  amount: number;
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const TransactionsModel = mongoose.model<ITransaction>('Transaction', TransactionSchema);
export default TransactionsModel;
