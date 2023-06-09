import { useLoaderData, Link } from "react-router-dom";
import {toast} from 'react-toastify'
import { getLocalStorageItem, createBudget, useWait, createExpense, deleteItem } from "../helpers";
import { Intro, AddBudgetForm, AddExpenseForm, BudgetItem, Table } from '../components'

export function dashBoardLoader(){
    const userName = getLocalStorageItem('userName')
    const budgets = getLocalStorageItem("budgets");
    const expenses = getLocalStorageItem("expenses");
    return { userName, budgets, expenses }
}

export async function dashboardAction({request}){
    await useWait()

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data)

    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Bem-vindo, ${values.userName.charAt(0).toUpperCase() + values.userName.slice(1) }`)
        } catch (e) {
            throw new Error("There was a problem creating your account.")
        }
    }

    if (_action === "createBudget") {
        try {
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount,
            })
            return toast.success("Orçamento criado!")
        } catch (e) {
            throw new Error("There was a problem creating your budget.")
        }
    }

    if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Despesa ${values.newExpense} criada!`)
        } catch (e) {
            throw new Error("There was a problem creating your expense.")
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

export function Dashboard() {

    const { userName, budgets, expenses } = useLoaderData()

    return (
        <div>
            {userName ? (
                <div className="dashboard">
                    <h1>Bem-vindo de volta, <span className="accent">{userName.charAt(0).toUpperCase() + userName.slice(1)}</span></h1>
                    <div className="grid-sm">
                        {budgets && budgets.length > 0 ?
                            (
                                <div className="grid-lg">
                                    <div className="flex-lg">
                                        <AddBudgetForm />
                                        <AddExpenseForm budgets={budgets} />
                                    </div>
                                    <h2>Orçamentos existentes</h2>
                                    <div className="budgets">
                                        {
                                            budgets.map((budget) => (
                                                <BudgetItem key={budget.id} budget={budget} />
                                            ))
                                        }
                                    </div>
                                    {
                                        expenses && expenses.length > 0 && (
                                            <div className="grid-md">
                                                <h2>Despesas recentes</h2>
                                                <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0.8)} />
                                                {expenses.length > 8 && (
                                                    <Link to="expenses" className="btn btn--dark">
                                                        Ver todas as despesas
                                                    </Link>
                                                )}
                                            </div>
                                        )
                                    }
                                </div>
                            )
                            :
                            (
                                <div className="grid-sm">
                                    <p>O controle do seu dinheiro é a chave para a liberdade financeira.</p>
                                    <p>Crie um orçamento para começar!</p>
                                    <AddBudgetForm />
                                </div>
                            )
                        }
                    </div>
                </div>
            ) : <Intro />}
        </div>
    );
}
