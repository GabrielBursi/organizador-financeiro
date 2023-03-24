import { Form, Link } from "react-router-dom";
import { BsFillTrash3Fill } from 'react-icons/bs'
import { HiOutlineBanknotes } from 'react-icons/hi2'

import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";

export function BudgetItem({ budget, showDelete = false }) {
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
                <p>{formatCurrency(amount)} Budgeted</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} spent</small>
                <small>{formatCurrency(amount - spent)} remaining</small>
            </div>
            {showDelete ? (
                <div className="flex-sm">
                    <Form
                        method="post"
                        action="delete"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Are you sure you want to permanently delete this budget?"
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit" className="btn">
                            <span>Delete Budget</span>
                            <BsFillTrash3Fill width={20} />
                        </button>
                    </Form>
                </div>
            ) : (
                <div className="flex-sm">
                    <Link to={`/budget/${id}`} className="btn">
                        <span>View Details</span>
                            <HiOutlineBanknotes width={20} />
                    </Link>
                </div>
            )}
        </div>
    )
}