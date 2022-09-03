export default (state = { isLoading: true, transactions: [] }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };

    case "FETCH":
      return { ...state, transactions: action.payload };

    case "CREATE":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    // return [...transactions, action.payload];

    case "DELETE":
      return {
        ...state,
        transactions: state.transactions.filter(
          (t) => t._id !== action.payload
        ),
      };
    // return transactions.filter(
    //   (transaction) => transaction._id !== action.payload
    // );

    case "UPDATE":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
      };
    // return transactions.map((transaction) =>
    //   transaction._id === action.payload._id ? action.payload : transaction
    // );
    default:
      return state;
  }
};
