import express, { Request, Response, Router } from "express";

import { findTransaction } from "../../shared/utils/transaction";

const router: Router = express.Router();

export default router.post("/", async (req: Request, res: Response) => {
  try {
    const { transactionID }: { transactionID: string } = req.body.transaction;
    const getTransactionDetails = findTransaction(transactionID);

    if (!getTransactionDetails) {
      res.status(400).send({ message: "Transaction could not be found", data: null });
      return;
    }
    const transactionData = {
      amount: getTransactionDetails.commission.amount.toString(),
      currency: getTransactionDetails.commission.currency,
    };
    res.status(200).send({ message: "success", data: transactionData });
  } catch (e) {
    res.status(400).send({ message: "something went wrong", data: null });
  }
  return;
});
