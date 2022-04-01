import express, { Request, Response, Router } from "express";
import { transactions } from "../../database/index";
import Transaction from "../../ts/interfaces/transaction_interface";
const router: Router = express.Router();

export default router.post("/", async (req: Request, res: Response) => {
  const { transactionID }: { transactionID: string } = req.body.transaction;

  try {
    const getTransactionDetails = transactions.find((transaction: Transaction) => transaction.transactionID === transactionID);
    if (!getTransactionDetails) {
      res.status(400).send({ message: "not found", data: null });
      return;
    }
    const transactionData = {
      amount: getTransactionDetails.commission.amount.toString(),
      currency: getTransactionDetails.commission.currency,
    };
    res.status(200).send({ message: "sucess", data: transactionData });
  } catch (e) {
    res.status(400).send({ message: "something went wrong", data: null });
  }
  return;
});
