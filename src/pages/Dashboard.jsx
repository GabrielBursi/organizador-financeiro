import { useLoaderData } from "react-router-dom";
import {toast} from 'react-toastify'
import { useLocalStorage, createBudget, useWait, createExpense } from "../hooks";
import { Intro, AddBudgetForm, AddExpenseForm, BudgetItem } from '../components'

export function dashBoardLoader(){
    const userName = useLocalStorage('userName')
    const budgets = useLocalStorage("budgets");
    return { userName, budgets }
}

export async function dashboardAction({request}){
    await useWait()

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data)

    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome, ${values.userName}`)
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
            return toast.success("Budget created!")
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
            return toast.success(`Expense ${values.newExpense} created!`)
        } catch (e) {
            throw new Error("There was a problem creating your expense.")
        }
    }
}

export function Dashboard() {

    const { userName, budgets } = useLoaderData()

    return (
        <div>
            {userName ? (
                <div className="dashboard">
                    <h1>Welcome back, <span className="accent">{userName}</span></h1>
                    <div className="grid-sm">
                        {budgets && budgets.length > 0 ? 
                            (
                                <div className="grid-lg">
                                    <div className="flex-lg">
                                        <AddBudgetForm />
                                        <AddExpenseForm budgets={budgets}/>
                                    </div>
                                    <h2>Existing Budgets</h2>
                                    <div className="budgets">
                                        {
                                            budgets.map((budget) => (
                                                <BudgetItem key={budget.id} budget={budget} />
                                            ))
                                        }
                                    </div>
                                </div>
                            ) 
                            : 
                            (
                                <div className="grid-sm">
                                    <p>Personal budgeting is the secret to financial freedom.</p>
                                    <p>Create a budget to get started!</p>
                                    <AddBudgetForm />
                                </div>
                            )
                        }
                    </div>
                </div>
            ) : <Intro/>}
        </div>
    );
}
