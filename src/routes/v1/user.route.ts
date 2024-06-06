import { Router } from "express";
import { getTransactions, addTransaction, deleteTransaction } from "../../controllers/user.controller";

const router = Router();

router.get("/", getTransactions);
router.post('/', addTransaction);
router.delete("/:id", deleteTransaction)

export default router;
