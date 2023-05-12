import { ExpenseItem } from "./ExpenseItem"

export function Table({ expenses, showBudget = true }) {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {["Nome", "Valor", "Data", showBudget ? "Budget" : "", ""].map(
                            (i, index) => (
                                <th key={index}>{i}</th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <ExpenseItem expense={expense} showBudget={showBudget} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}