import Transaction from "../ts/interfaces/transaction_interface";
import Client from "../ts/interfaces/client_interface";

// This local database can be easily transfered into a real database such as mongo DB or Postggres SQL.

const exampleTransactions = [
  {
    transactionDate: new Date(),
    transactionID: "14ow41pvhl1gxphog",
    clientID: 41,
    transaction: {
      currency: "USD",
      amount: 100,
    },
    commission: {
      currency: "EURO",
      amount: 0.3,
    },
  },
];
const exampleClients = [
  {
    id: 41,
    transactions: [
      {
        transactionID: "14ow41pvhl1gxphog",
        transactionDate: new Date("10/17/2002"),
      },
    ],
  },
];
export const transactions: Transaction[] = exampleTransactions;
export const clients: Client[] = exampleClients;
