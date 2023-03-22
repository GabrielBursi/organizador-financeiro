import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { removerLocalStorage } from "../hooks";

export async function logoutAction() {
    removerLocalStorage({ key: "userName" })
    removerLocalStorage({ key: "budgets" })
    removerLocalStorage({ key: "expenses" })
    toast.success('You`ve deleted your account!')
    return redirect('/')
}