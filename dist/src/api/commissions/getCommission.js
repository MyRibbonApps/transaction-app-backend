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
const index_1 = require("../../database/index");
const router = express_1.default.Router();
exports.default = router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { transactionID } = req.body.transaction;
        console.log(transactionID);
        const getTransactionDetails = index_1.transactions.find((transaction) => transaction.transactionID === transactionID);
        if (!getTransactionDetails) {
            res.status(400).send({ message: "not found", data: null });
            return;
        }
        const transactionData = {
            amount: getTransactionDetails.commission.amount.toString(),
            currency: getTransactionDetails.commission.currency,
        };
        res.status(200).send({ message: "sucess", data: transactionData });
    }
    catch (e) {
        res.status(400).send({ message: "something went wrong", data: null });
    }
    return;
}));
