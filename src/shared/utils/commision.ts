import { commisionRules } from "../../../src/commission_rules.config";
import { clients, transactions } from "../../database/index";
import Client from "../../ts/interfaces/client_interface";

export const calculateTurnOver = (clientID: number, findClient: (clientID: number) => Client | undefined, requiredTurnOver: number): boolean => {
  const getClient = findClient(clientID);

  // Get all transactions
  const getTransactions = getClient!.transactions.map((tsxItem) => {
    return transactions.find((tsx) => tsx.transactionID === tsxItem.transactionID);
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
  if (getTransactionsThisMonth.length === 0) return false;
  const totalTurnOver = getTransactionsThisMonth.reduce((prev: any, cur: any) => {
    return prev + cur.transaction.amount;
  }, 0);
  // If the client has reached the required turnover rate,  this discount will be applied.
  if (totalTurnOver >= requiredTurnOver) return true;
  return false;
};

export const calculateCommision = (clientID: number, amount: number): number => {
  // Getting the rules for the commission discounts
  const commissionFunctions = Object.values(commisionRules);
  // Checking which rule returns true first based on the priority
  const findIt = commissionFunctions.find((item) => item.shouldBeApplied(clientID));
  return findIt!.calculateCommission(amount);
};
