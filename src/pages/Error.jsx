;
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'

export function ErrorPage() {

    const error = useRouteError()
    const navigate = useNavigate()

    return (
        <div className="error">
            <h1>Ops! Temos um problema.</h1>
            <p>{error?.message || error?.statusText || 'erro.'}</p>
            <div className="flex-md">
                <button
                    className="btn btn--dark"
                    onClick={() => navigate(-1)}
                >
                    <BiArrowBack width={20} />
                    <span>Voltar</span>
                </button>
                <Link
                    to="/"
                    className="btn btn--dark"
                >
                    <AiOutlineHome width={20} />
                    <span>Página Inicial</span>
                </Link>
            </div>
        </div>
    );
}
