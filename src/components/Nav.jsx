;
import { Form, NavLink } from 'react-router-dom';
import { assets } from '../assets';
import {AiOutlineDelete} from 'react-icons/ai'
export function Nav({userName}) {

    function handleSubmit(e){
        if(!confirm("Delete user and all data?")){
            e.preventDefault()
        }
    }

    return (
        <nav>
        <NavLink
            to='/'
            aria-label='Go to home'
        >
            <img src={assets.logo} alt='home' height={30}/>
            <span>HomeBudget</span>
        </NavLink>
        {
            userName && 
            <Form
                method='post'
                action='/logout'
                onSubmit={handleSubmit}
            >
                        <button type='submit' className='btn btn--warning'><span>Delete User</span><AiOutlineDelete/></button>
            </Form>
        }
        </nav>
    );
}