"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commisionRules = exports.requiredTurnOver = exports.currencyUsed = void 0;
const client_1 = require("./shared/utils/client");
const commision_1 = require("./shared/utils/commision");
// This is used throughout the app to determine which currency commissions should be paid in.
exports.currencyUsed = "EUR";
exports.requiredTurnOver = 1000;
// Add rules for commissions here, and choose which rule should be implemented first if it is true by set the priority.
exports.commisionRules = {
    highTurnOverDiscount: {
        //Rule #3: High turnover discount
        priority: 1,
        currency: exports.currencyUsed,
        shouldBeApplied: (clientID) => {
            // We could easily add an array with different client ids and choose a different turnover rate for some clients.
            if ((0, commision_1.calculateTurnOver)(clientID, client_1.findClient, exports.requiredTurnOver))
                return true;
            return false;
        },
        calculateCommission: () => 0.03,
    },
    dicountForIDS: {
        //Rule #2: Client with a discount
        priority: 2,
        currency: exports.currencyUsed,
        shouldBeApplied: (clientID) => {
            const clientsWithDisount = [42];
            return clientsWithDisount.find((id) => id === clientID) ? true : false;
        },
        calculateCommission: () => 0.05,
    },
    defaultCommission: {
        //Rule #1: Default pricing
        priority: 3,
        currency: exports.currencyUsed,
        shouldBeApplied: () => true,
        calculateCommission: (amount) => {
            const percentCommission = 0.05; // Percent 0.5%
            const minCommission = 0.05; // In Euro
            if (amount * percentCommission < minCommission)
                return minCommission;
            return amount * percentCommission;
        },
    },
};
