type Transaction = {
  transactionID: string;
  clientID: number;
  transactionDate: Date;
  transaction: {
    currency: string;
    amount: number;
  };
  commission: {
    currency: string;
    amount: number;
  };
};

export default Transaction;
