"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCommision = exports.calculateTurnOver = void 0;
const commission_rules_config_1 = require("../../../src/commission_rules.config");
const index_1 = require("../../database/index");
const calculateTurnOver = (clientID, findClient, requiredTurnOver) => {
    const getClient = findClient(clientID);
    // Get all transactions
    const getTransactions = getClient.transactions.map((tsxItem) => {
        return index_1.transactions.find((tsx) => tsx.transactionID === tsxItem.transactionID);
    });
    const monthNow = new Date().getMonth();
    const yearNow = new Date().getFullYear();
    // Get all transactions made this month, to check if the client qualify for turnover discount
    const getTransactionsThisMonth = getTransactions.filter((item) => {
        if (item) {
            const transactionMonth = new Date(item.transactionDate).getMonth();
            const transactionYear = new Date(item.transactionDate).getFullYear();
            if (monthNow === transactionMonth && yearNow === transactionYear) {
                return item;
            }
        }
    });
    if (getTransactionsThisMonth.length === 0)
        return false;
    const totalTurnOver = getTransactionsThisMonth.reduce((prev, cur) => {
        return prev + cur.transaction.amount;
    }, 0);
    // If the client has reached the required turnover rate,  this discount will be applied.
    if (totalTurnOver >= requiredTurnOver)
        return true;
    return false;
};
exports.calculateTurnOver = calculateTurnOver;
const calculateCommision = (clientID, amount) => {
    // Getting the rules for the commission discounts
    const commissionFunctions = Object.values(commission_rules_config_1.commisionRules);
    // Checking which rule returns true first based on the priority
    const findIt = commissionFunctions.find((item) => item.shouldBeApplied(clientID));
    return findIt.calculateCommission(amount);
};
exports.calculateCommision = calculateCommision;
