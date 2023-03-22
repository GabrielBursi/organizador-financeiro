import { useFormatCurrency, formatDateToLocaleString } from "../hooks"

export function ExpenseItem({ expense }) {
    return (
        <>
            <td>{expense.name}</td>
            <td>{useFormatCurrency(expense.amount)}</td>
            <td>{formatDateToLocaleString(expense.createdAt)}</td>
        </>
    )
}