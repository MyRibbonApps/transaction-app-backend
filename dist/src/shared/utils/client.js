"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTransactionToClientDB = exports.updateClient = exports.findClient = exports.createClient = void 0;
const index_1 = require("../../database/index");
const createClient = (clientID) => {
    index_1.clients.push({
        id: clientID,
        transactions: [],
    });
};
exports.createClient = createClient;
const findClient = (clientID) => {
    return index_1.clients.find((client) => client.id === clientID);
};
exports.findClient = findClient;
const updateClient = (clientID, transaction) => {
    const client = index_1.clients.findIndex((client) => client.id === clientID);
    const { transactionID } = transaction;
    const { transactionDate } = transaction;
    // Adding the transaction details to the client
    index_1.clients[client].transactions.push({ transactionID, transactionDate });
};
exports.updateClient = updateClient;
const addTransactionToClientDB = (clientID, transaction) => {
    (0, exports.updateClient)(clientID, transaction);
};
exports.addTransactionToClientDB = addTransactionToClientDB;
