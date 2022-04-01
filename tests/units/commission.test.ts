import { calculateTurnOver } from "../../src/shared/utils/commision";
import Client from "../../src/ts/interfaces/client_interface";
import { requiredTurnOver } from "../../src/commission_rules.config";

describe("Testing the turnover rate discount rule", () => {
  const clientID = 1818911;
  const transaction = {
    transactionDate: new Date("10/17/2002"),
    transactionID: "14ow41pvhl1gxphog",
  };
  const findClient = (id: number): Client => {
    return {
      id: clientID,
      transactions: [transaction],
    };
  };
  it("Tests if the client is eligable based on rules specified in the rules config file", () => {
    expect(calculateTurnOver(clientID, findClient, requiredTurnOver)).toBe(false);
  });
});
