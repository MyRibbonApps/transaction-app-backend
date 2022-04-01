import jest from "jest";
import request from "supertest";
import app from "../../index";
import { currencyUsed } from "../../src/commission_rules.config";

describe("Get commission details for a transaction", () => {
  const query = {
    transaction: {
      transactionID: "14ow41pvhl1gxphog",
    },
  };
  it("Should return the commission for a pre existing transaction", async () => {
    const response = await request(app).post("/api/getcommission").set("Content-type", "application/json").send(JSON.stringify(query)).expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        data: expect.objectContaining({
          currency: expect.stringMatching(currencyUsed),
          amount: expect.any(String),
        }),
      })
    );
  });
});
