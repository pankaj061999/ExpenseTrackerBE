import TransactionsModel from "../models/transaction.model";


export const getTransactions = async (): Promise<any> => {
  try {
    return await TransactionsModel.find();
  } catch (err) {
    throw new Error("Error fetching Transaction");
  }
};


export const addTransaction = async (text: string, amount: number): Promise<void | string> => {
  try {
    if (!text || !amount) {
      return 'Please provide text and amount';
    }

    const newTransaction = new TransactionsModel({
      text,
      amount,
    });

    const savedTransaction = await newTransaction.save();
    return "success";
  } catch (err) {
    if (err instanceof Error) {
      throw new Error("Error saving transaction: " + err.message);
    } else {
      throw new Error("Error saving transaction");
    }
  }
};



export const deleteTransaction = async (id: string): Promise<string> => {
  try {
    const transaction = await TransactionsModel.findById(id);

    if (!transaction) {
      throw new Error('No transaction found');
    }

    await transaction.deleteOne();
    return 'Transaction removed';
  } catch (err) {
    if (err instanceof Error) {
      throw new Error("Error deleting transaction: " + err.message);
    } else {
      throw new Error("Error deleting transaction");
    }
  }
};