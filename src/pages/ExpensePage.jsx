import { useLoaderData } from "react-router-dom";
import { useLocalStorage, deleteItem } from "../hooks";
import { Table } from '../components'
import { toast } from "react-toastify";

export function expensesLoader() {
    const expenses = useLocalStorage("expenses");
    return { expenses };
}
export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "deleteExpense") {
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId,
            });
            return toast.success("Expense deleted!");
        } catch (e) {
            throw new Error("There was a problem deleting your expense.");
        }
    }
}

export function ExpensesPage() {
    const { expenses } = useLoaderData();



    return (
        <div className="grid-lg">
            <h1>All Expenses</h1>
            {expenses && expenses.length > 0 ? (
                <div className="grid-md">
                    <h2>
                        Recent Expenses <small>({expenses.length} total)</small>
                    </h2>
                    <Table expenses={expenses} />
                </div>
            ) : (
                <p>No Expenses to show</p>
            )}
        </div>
    );
}