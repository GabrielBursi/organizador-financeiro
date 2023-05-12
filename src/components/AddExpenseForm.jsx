import { useEffect, useRef } from "react"
import { useFetcher } from "react-router-dom"
import {AiFillPlusCircle} from 'react-icons/ai'


export const AddExpenseForm = ({ budgets }) => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting";

    const formRef = useRef()
    const focusRef = useRef()

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset()
            focusRef.current.focus()
        }

    }, [isSubmitting])

    return (
        <div className="form-wrapper">
            <h2 className="h3">Adicionar Nova Despesa Para{" "}<span className="accent">
                {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
            </span>{" "}
            </h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Nome da Despesa</label>
                        <input
                            autoComplete="off"
                            type="text"
                            name="newExpense"
                            id="newExpense"
                            placeholder="ex: Café"
                            ref={focusRef}
                            required
                        />
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Valor</label>
                        <input
                            autoComplete="off"
                            type="number"
                            step="0.01"
                            inputMode="decimal"
                            name="newExpenseAmount"
                            id="newExpenseAmount"
                            placeholder="ex: 3.50"
                            required
                        />
                    </div>
                </div>
                <div className="grid-xs" hidden={budgets.length === 1}>
                    <label htmlFor="newExpenseBudget">Categoria do Orçamento</label>
                    <select name="newExpenseBudget" id="newExpenseBudget" required>
                        {
                            budgets
                                .sort((a, b) => a.createdAt - b.createdAt)
                                .map((budget) => {
                                    return (
                                        <option key={budget.id} value={budget.id}>
                                            {budget.name}
                                        </option>
                                    )
                                })
                        }
                    </select>
                </div>
                <input autoComplete="off" type="hidden" name="_action" value="createExpense" />
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Enviando…</span> : (
                            <>
                                <span>Adicionar Despesa</span>
                                <AiFillPlusCircle width={20} />
                            </>
                        )
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}