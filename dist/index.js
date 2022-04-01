"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const getCommission_1 = __importDefault(require("./src/api/commissions/getCommission"));
const createTransaction_1 = __importDefault(require("./src/api/transactions/createTransaction"));
const app = (0, express_1.default)();
// This parse the JSON and puts the parsed data in the body in the request paramater
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    methods: ["POST"],
}));
app.use("/api/createtransaction", createTransaction_1.default);
app.use("/api/getcommission", getCommission_1.default);
const PORT = 3001 || process.env.PORT;
// We cant run tests in pararell, we can specify nothing instead when we run tests
if (process.env.NODE_ENV !== "test") {
    const listener = app.listen(PORT, () => {
        const onPort = listener.address().port;
        console.log(`Server is runnsing on ${onPort} 😎!`);
    });
}
exports.default = app;
