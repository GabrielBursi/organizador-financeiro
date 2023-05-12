;
import { Form, NavLink } from 'react-router-dom';
import { assets } from '../assets';
import { AiOutlineDelete } from 'react-icons/ai'
export function Nav({ userName }) {

    function handleSubmit(e) {
        if (!confirm("Excluir Usuário e todos os dados?")) {
            e.preventDefault()
        }
    }

    return (

        <nav>
            <NavLink
                to='/'
                aria-label='Ir para página inicial'
            >
                <img src={assets.logo} alt='home' height={30} />
                <span>Home</span>
            </NavLink>
            {
                userName &&
                <Form
                    method='post'
                    action='/logout'
                    onSubmit={handleSubmit}
                >
                    <button type='submit' className='btn btn--warning'><span>Excluir Usuário</span><AiOutlineDelete /></button>
                </Form>
            }
        </nav>
    );
}