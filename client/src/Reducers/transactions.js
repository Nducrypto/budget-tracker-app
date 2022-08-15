export default (transactions = [], action) => {
  switch (action.type) {
    case "FETCH":
      return action.payload;

    case "CREATE":
      return [...transactions, action.payload];

    case "DELETE":
      return transactions.filter(
        (transaction) => transaction._id !== action.payload
      );

    case "UPDATE":
      return transactions.map((transaction) =>
        transaction._id === action.payload._id ? action.payload : transaction
      );
    default:
      return transactions;
  }
};
