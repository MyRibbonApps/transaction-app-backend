import Transaction from "../../ts/interfaces/transaction_interface";
import { clients, transactions } from "../../database/index";
import Client from "../../ts/interfaces/client_interface";

export const createClient = (clientID: number): void => {
  clients.push({
    id: clientID,
    transactions: [],
  });
};

export const findClient = (clientID: number): Client | undefined => {
  return clients.find((client) => client.id === clientID);
};

export const updateClient = (clientID: number, transaction: Transaction): void => {
  const client = clients.findIndex((client) => client.id === clientID);
  const { transactionID } = transaction;
  const { transactionDate } = transaction;
  // Adding the transaction details to the client
  clients[client].transactions.push({ transactionID, transactionDate });
};

export const addTransactionToClientDB = (clientID: number, transaction: Transaction): void => {
  updateClient(clientID, transaction);
};
