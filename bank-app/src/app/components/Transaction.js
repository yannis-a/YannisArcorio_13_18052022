export function Transaction({transactionTitle, transactionAmount, transactionAmountDescription}) {
    return (
        <div className="account-content-wrapper">
            <h3 className="account-title">{transactionTitle}</h3>
            <p className="account-amount">{transactionAmount}</p>
            <p className="account-amount-description">{transactionAmountDescription}</p>
        </div>
    );
}