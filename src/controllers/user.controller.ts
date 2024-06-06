import httpStatus from "http-status";
import { userService } from "../services";
import catchAsync from "../utils/catchAsync";

const getTransactions = catchAsync(async (req, res) => {
  try {
    const result = await userService.getTransactions();
    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: "successful",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const addTransaction = catchAsync(async (req, res)=> {
  try {
    const { text, amount } = req.body;

    const result = await userService.addTransaction(text, amount);
    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: "successful",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
})

const deleteTransaction = catchAsync(async (req, res)=> {
  try {
    const { id } = req.params;
    const result = await userService.deleteTransaction(id);
    res.status(httpStatus.OK).json({
      code: httpStatus.OK,
      message: "successful",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
})



export {
  getTransactions,
  addTransaction,
  deleteTransaction
};
