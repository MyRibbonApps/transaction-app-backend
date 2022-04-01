import { findClient } from "./shared/utils/client";
import { calculateTurnOver } from "./shared/utils/commision";

// This is used throughout the app to determine which currency commissions should be paid in.
export const currencyUsed: string = "EUR";
export const requiredTurnOver = 1000;

// Add rules for commissions here, and choose which rule should be implemented first if it is true by set the priority.
export const commisionRules = {
  highTurnOverDiscount: {
    //Rule #3: High turnover discount
    priority: 1, // Should be applied if it is true first
    currency: currencyUsed,
    shouldBeApplied: (clientID: number): boolean => {
      // We could easily add an array with different client ids and choose a different turnover rate for some clients.
      if (calculateTurnOver(clientID, findClient, requiredTurnOver)) return true;
      return false;
    },
    calculateCommission: (): number => 0.03,
  },

  dicountForIDS: {
    //Rule #2: Client with a discount
    priority: 2, // Should be applied if it is true second
    currency: currencyUsed,
    shouldBeApplied: (clientID: number): boolean => {
      const clientsWithDisount = [42];
      return clientsWithDisount.find((id) => id === clientID) ? true : false;
    },
    calculateCommission: (): number => 0.05,
  },

  defaultCommission: {
    //Rule #1: Default pricing
    priority: 3, // Should be applied if it is true third
    currency: currencyUsed,
    shouldBeApplied: (): boolean => true,
    calculateCommission: (amount: number): number => {
      const percentCommission: number = 0.05; // Percent 0.5%
      const minCommission: number = 0.05; // In Euro
      if (amount * percentCommission < minCommission) return minCommission;
      return amount * percentCommission;
    },
  },
};
