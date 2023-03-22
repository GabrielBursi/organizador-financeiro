import { calculateSpentByBudget, useFormatCurrency, useFormatPercentage } from "../hooks";

export function BudgetItem({ budget }) {
    const { id, name, amount, color } = budget;
    const spent = calculateSpentByBudget(id);

    return (
        <div
            className="budget"
            style={{
                "--accent": color
            }}
        >
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{useFormatCurrency(amount)} Budgeted</p>
            </div>
            <progress max={amount} value={spent}>
                {useFormatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{useFormatCurrency(spent)} spent</small>
                <small>{useFormatCurrency(amount - spent)} remaining</small>
            </div>
        </div>
    )
}