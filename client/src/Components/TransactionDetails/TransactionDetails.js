import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getTransaction } from "../../Actions/Transactions";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";

const TransactionDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("profile"));

  const creator = user?.result._id || user?.result.googleId;

  const { transactions, transaction } = useSelector(
    (state) => state.transactions
  );

  const filtered = transactions.filter((p) =>
    creator ? p.creator === creator : null
  );
  const recommend = filtered.filter((t) => t._id !== transaction._id);

  useEffect(() => {
    dispatch(getTransaction(id));
  }, [id, dispatch]);

  return (
    <div>
      <div>
        <h2 style={{ textAlign: "center", fontSize: "5rem" }}>
          {transaction.type}
        </h2>
        <h2>{transaction.category}</h2>
        <div>
          Created on <pr />
          {transaction.date}
        </div>
        <div>${transaction.amount}</div>
      </div>
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        transactions you may like
        {recommend.map((p) => (
          <div
            style={{ marginTop: "1rem" }}
            onClick={() => history.push(`/page/${p._id}`)}
          >
            <h1>{p.type}</h1>
            <h2>{p.category}</h2>
            <hi>{p.date}</hi>
            <hi>{p.amount}</hi>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionDetails;
