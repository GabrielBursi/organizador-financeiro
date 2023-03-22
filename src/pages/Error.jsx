;
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'

export function Error() {

    const error = useRouteError()
    const navigate = useNavigate()

    return (
        <div className="error">
            <h1>Uh oh! We’ve got a problem.</h1>
            <p>{error?.message || error?.statusText || 'erro.'}</p>
            <div className="flex-md">
                <button
                    className="btn btn--dark"
                    onClick={() => navigate(-1)}
                >
                    <BiArrowBack width={20} />
                    <span>Go Back</span>
                </button>
                <Link
                    to="/"
                    className="btn btn--dark"
                >
                    <AiOutlineHome width={20} />
                    <span>Go home</span>
                </Link>
            </div>
        </div>
    );
}
