import { useLocalStorage } from "./useLocalStorage";

export function useFormatPercentage(amt) {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    })
}

export function useFormatCurrency(amt) {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}

export function calculateSpentByBudget(budgetId) {
    const expenses = useLocalStorage("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if (expense.budgetId !== budgetId)
            return acc;
        return acc += expense.amount;
    }, 0);
    return budgetSpent;
}