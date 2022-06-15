import { Transaction } from "./Transaction";

export function Account() {
  const accountsData = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "$184.30",
      description: "Current Balance",
    },
  ];

  const transactions = accountsData.map((account, index) => (
    <Transaction
      transactionTitle={account.title}
      transactionAmount={account.amount}
      transactionAmountDescription={account.description}
      key={index}
    />
  ));

  return (
    <section className="account">
      {transactions}
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}
