import { useLoaderData } from "react-router-dom";
import { getLocalStorageItem, deleteItem } from "../helpers";
import { Table } from '../components'
import { toast } from "react-toastify";

export function expensesLoader() {
    const expenses = getLocalStorageItem("expenses");
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
            return toast.success("Despesa excluída!");
        } catch (e) {
            throw new Error("There was a problem deleting your expense.");
        }
    }
}

export function ExpensesPage() {
    const { expenses } = useLoaderData();



    return (
        <div className="grid-lg">
            <h1>Todas as Despesas</h1>
            {expenses && expenses.length > 0 ? (
                <div className="grid-md">
                    <h2>
                        Despesas Recentes <small>({expenses.length} no total)</small>
                    </h2>
                    <Table expenses={expenses} />
                </div>
            ) : (
                <p>Nenhuma despesa para mostrar</p>
            )}
        </div>
    );
}