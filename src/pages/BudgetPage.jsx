import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { Table, BudgetItem, AddExpenseForm } from '../components'

import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

export async function budgetLoader({ params }) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id,
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id,
    });

    if (!budget) {
        throw new Error("The budget you’re trying to find doesn’t exist");
    }

    return { budget, expenses };
}

export async function budgetAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget,
            });
            return toast.success(`Despesa ${ values.newExpense } criada!`);
        } catch (e) {
            throw new Error("There was a problem creating your expense.");
        }
    }

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

export function BudgetPage() {
    const { budget, expenses } = useLoaderData();

    return (
        <div
            className="grid-lg"
            style={{
                "--accent": budget.color,
            }}
        >
            <h1 className="h2">
                Visão geral de <span className="accent">{budget.name}</span>
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true} />
                <AddExpenseForm budgets={[budget]} />
            </div>
            {expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2>
                        Despesas de <span className="accent">{budget.name}</span>
                    </h2>
                    <Table expenses={expenses} showBudget={false} />
                </div>
            )}
        </div>
    );
}