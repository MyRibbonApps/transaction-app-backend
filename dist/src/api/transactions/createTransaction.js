"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_1 = require("../../shared/utils/transaction");
const client_1 = require("../../shared/utils/client");
const console_1 = __importDefault(require("console"));
const database_1 = require("../../database");
const commission_rules_config_1 = require("../../commission_rules.config");
const router = express_1.default.Router();
exports.default = router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console_1.default.log(req.body);
        const { transaction } = req.body;
        const { clientID } = req.body;
        const transactionAmount = parseInt(transaction.transactionAmount);
        const transactionCurrency = transaction.transactionCurrency;
        // If transaction is in the specified currency, no need to convert it.
        const amount = transactionCurrency === commission_rules_config_1.currencyUsed ? transactionAmount : yield (0, transaction_1.convertCurrency)(transactionCurrency, transactionAmount);
        // Checking if the client exists, else we add th client as a new client to the database
        const clientExists = (0, client_1.findClient)(clientID);
        if (!clientExists)
            (0, client_1.createClient)(clientID);
        // Creating new transaction
        const newTransaction = (0, transaction_1.createTransaction)(transaction, clientID, amount);
        /*
        Adding the transaction details into the client
        If the client dooes not exist we create a new client and adding the transaction details to it
       */
        (0, client_1.addTransactionToClientDB)(clientID, newTransaction);
        console_1.default.log("Transactions:", database_1.transactions);
        console_1.default.log("Clients:", database_1.clients);
        res.status(200).send({ message: "success", data: { transactionID: newTransaction.transactionID } });
    }
    catch (e) {
        console_1.default.log(e);
        res.status(400).send({ message: "Something went wrong", data: null });
    }
    return;
}));
