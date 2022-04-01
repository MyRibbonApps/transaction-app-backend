import express, { Express, Request, Response } from "express";
import cors from "cors";

import getCommission from "./src/api/commissions/getCommission";
import createTransaction from "./src/api/transactions/createTransaction";

const app: Express = express();
// This parse the JSON and puts the parsed data in the body in the request paramater
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST"],
  })
);

app.use("/api/createtransaction", createTransaction);
app.use("/api/getcommission", getCommission);

const PORT = 3001 || process.env.PORT;

// We cant run tests in pararell, we can specify nothing instead when we run tests
if (process.env.NODE_ENV !== "test") {
  const listener: any = app.listen(PORT, () => {
    const onPort = listener.address().port;
    console.log(`Server is running on ${onPort} 😎!`);
  });
}
export default app;
