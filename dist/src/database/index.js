"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clients = exports.transactions = void 0;
// This local database can be easily transfered into a real database such as mongo DB or Postggres SQL.
const exampleTransactions = [
    {
        transactionDate: new Date(),
        transactionID: "14ow41pvhl1gxphog",
        clientID: 42,
        transaction: {
            currency: "USD",
            amount: 100,
        },
        commission: {
            currency: "EURO",
            amount: 0.05,
        },
    },
];
const exampleClients = [
    {
        id: 42,
        transactions: [
            {
                transactionID: "14ow41pvhl1gxphog",
                transactionDate: new Date("10/17/2002"),
            },
        ],
    },
];
exports.transactions = exampleTransactions;
exports.clients = exampleClients;
