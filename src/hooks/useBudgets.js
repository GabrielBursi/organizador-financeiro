import { useLocalStorage } from "./useLocalStorage";

const generateRandomColor = () => {
    const existingBudgetLength = useLocalStorage("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

export function createBudget({name, amount}) {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingBudgets = useLocalStorage("budgets") ?? [];
    return localStorage.setItem("budgets",
    JSON.stringify([...existingBudgets, newItem]))
}

export function createExpense({name, amount, budgetId}) {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = useLocalStorage("expenses") ?? [];
    return localStorage.setItem("expenses",
    JSON.stringify([...existingExpenses, newItem]))
}

export function getAllMatchingItems({ category, key, value }) {
    const data = useLocalStorage(category) ?? [];
    return data.filter((item) => item[key] === value);
}

export function deleteItem({ key, id }) {
    const existingData = useLocalStorage(key);
    if (id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}