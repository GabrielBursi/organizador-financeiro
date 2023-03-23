import { Link, useFetcher } from "react-router-dom";
import { BsFillTrash3Fill } from 'react-icons/bs'

import { useFormatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../hooks"

export function ExpenseItem({ expense }) {

    const fetcher = useFetcher();

    const budget = getAllMatchingItems({ 
        category: "budgets",
        key: "id",
        value: expense.budgetId,
    })[0];

    return (
        <>
            <td>{expense.name}</td>
            <td>{useFormatCurrency(expense.amount)}</td>
            <td>{formatDateToLocaleString(expense.createdAt)}</td>
            <td>
                <Link
                    to={`/budget/${budget.id}`}
                    style={{
                        "--accent": budget.color,
                    }}
                >
                    {budget.name}
                </Link>
            </td>
            <td>
                <fetcher.Form method="post">
                    <input type="hidden" name="_action" value="deleteExpense" />
                    <input type="hidden" name="expenseId" value={expense.id} />
                    <button
                        type="submit"
                        className="btn btn--warning"
                        aria-label={`Delete ${expense.name} expense`}
                    >
                        <BsFillTrash3Fill width={20} />
                    </button>
                </fetcher.Form>
            </td>
        </>
    )
}