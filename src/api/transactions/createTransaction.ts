import express, { Request, Response, Router } from "express";

import { convertCurrency, createTransaction } from "../../shared/utils/transaction";
import { addTransactionToClientDB, createClient, findClient } from "../../shared/utils/client";
import console from "console";
import { clients, transactions } from "../../database";
import { currencyUsed } from "../../commission_rules.config";

const router: Router = express.Router();

export default router.post("/", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { transaction } = req.body;
    const { clientID }: { clientID: number } = req.body;

    const transactionAmount = parseInt(transaction.transactionAmount);
    const transactionCurrency = transaction.transactionCurrency;
    // If transaction is in the specified currency, no need to convert it.
    const amount: number = transactionCurrency === currencyUsed ? transactionAmount : await convertCurrency(transactionCurrency, transactionAmount);

    // Checking if the client exists, else we add th client as a new client to the database
    const clientExists = findClient(clientID);
    if (!clientExists) createClient(clientID);

    // Creating new transaction
    const newTransaction = createTransaction(transaction, clientID, amount);

    /*
    Adding the transaction details into the client
    If the client dooes not exist we create a new client and adding the transaction details to it
   */
    addTransactionToClientDB(clientID, newTransaction);
    console.log("Transactions:", transactions);
    console.log("Clients:", clients);
    res.status(200).send({ message: "success", data: { transactionID: newTransaction.transactionID } });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Something went wrong", data: null });
  }
  return;
});
