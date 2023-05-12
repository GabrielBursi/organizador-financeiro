const generateRandomColor = () => {
    const existingBudgetLength = getLocalStorageItem("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

export function createBudget({ name, amount }) {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingBudgets = getLocalStorageItem("budgets") ?? [];
    return localStorage.setItem("budgets",
        JSON.stringify([...existingBudgets, newItem]))
}

export function createExpense({ name, amount, budgetId }) {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = getLocalStorageItem("expenses") ?? [];
    return localStorage.setItem("expenses",
        JSON.stringify([...existingExpenses, newItem]))
}

export function getAllMatchingItems({ category, key, value }) {
    const data = getLocalStorageItem(category) ?? [];
    return data.filter((item) => item[key] === value);
}

export function deleteItem({ key, id }) {
    const existingData = getLocalStorageItem(key);
    if (id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

export function formatPercentage(amt) {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    })
}

export function formatCurrency(amt) {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "BRL"
    })
}

export function calculateSpentByBudget(budgetId) {
    const expenses = getLocalStorageItem("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if (expense.budgetId !== budgetId)
            return acc;
        return acc += expense.amount;
    }, 0);
    return budgetSpent;
}

export function formatDateToLocaleString(epoch) {
    return new Date(epoch).toLocaleDateString();
}

export const getLocalStorageItem = (key) => JSON.parse(localStorage.getItem(key))

export const useWait = () => new Promise(res => setTimeout(res, Math.random() * 2000))
