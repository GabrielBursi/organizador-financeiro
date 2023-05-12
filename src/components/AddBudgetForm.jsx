import { useEffect, useRef } from 'react';
import { useFetcher } from "react-router-dom"
import { BsCurrencyDollar } from 'react-icons/bs'

export function AddBudgetForm() {

    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting"


    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if (!isSubmitting) {
            formRef?.current?.reset()
            focusRef?.current?.focus()
        }
    }, [isSubmitting]);

    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Criar orçamento
            </h2>
            <fetcher.Form
                method="post"
                className="grid-sm"
                ref={formRef}
            >
                <div className="grid-xs">
                    <label htmlFor="newBudget">Nome do orçamento</label>
                    <input
                        autoComplete='off'
                        type="text"
                        name="newBudget"
                        id="newBudget"
                        placeholder="Ex.: Mantimentos"
                        required
                        ref={focusRef}
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Valor</label>
                    <input
                        autoComplete='off'
                        type="number"
                        step="0.01"
                        name="newBudgetAmount"
                        id="newBudgetAmount"
                        placeholder="Ex.: 350"
                        required
                        inputMode="decimal"
                    />
                </div>
                <input autoComplete='off' type="hidden" name="_action" value="createBudget" />
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Enviando…</span> : (
                            <>
                                <span>Criar orçamento</span>
                                <BsCurrencyDollar width={20} />
                            </>
                        )
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}