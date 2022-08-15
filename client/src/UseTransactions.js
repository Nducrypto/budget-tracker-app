import {
  expenseCategories,
  // expenseColors,
  incomeCategories,
  // incomeColors,
  resetCategories,
} from "./Constants/Categories";
import { useSelector } from "react-redux";

const UseTransactions = (title) => {
  resetCategories();
  const user = JSON.parse(localStorage.getItem("profile"));
  const creator = user?.result._id || user?.result.googleId;

  const transactions = useSelector((state) =>
    state.transactions.filter((p) => p.creator === creator)
  );

  const transactionsPerType = transactions.filter(
    (transaction) => transaction.type === title
  );

  const total = transactionsPerType.reduce(
    (accumulator, currentvalue) => (accumulator += currentvalue.amount),
    0
  );

  const categories = title === "Income" ? incomeCategories : expenseCategories;

  transactionsPerType.forEach((transaction) => {
    const category = categories.find(
      (category) => category.type === transaction.category
    );
    if (category) category.amount += transaction.amount;
  });

  //   dis event means that Categories will return d ones wr d category.amount is greater than zero
  const filteredCategories = categories.filter(
    (category) => category.amount > 0
  );

  const chartData = {
    type: "doughnut",
    datasets: [
      {
        data: filteredCategories.map((category) => category.amount),
        backgroundColor: filteredCategories.map((category) => category.color),
      },
    ],
    labels: filteredCategories.map((category) => category.type),
  };

  // returned it here so i can use it in other component
  return { total, chartData };
};

export default UseTransactions;
