import { Form } from "react-router-dom";
import { assets } from '../assets'
import { AiOutlineUserAdd } from 'react-icons/ai'

export function Intro() {
    return (
        <div className="intro">
            <div>
                <h1>
                    Take Control of <span className="accent">Your Money</span>
                </h1>
                <p>
                    Personal budgeting is the secret to financial freedom. Start your journey today. 
                </p>
                <Form method="post"> 
                    <input
                        type='text'
                        name="userName"
                        required
                        placeholder="What is your name?"
                        aria-label="Your name"
                        autoComplete="off"
                    />
                    <input type="hidden" name="_action" value="newUser" />
                    <button type="submit" className="btn btn--dark">
                        <span>Create Account</span>
                        <AiOutlineUserAdd width={20}/>
                    </button>
                </Form>
            </div>
            <img src={assets.illustration} alt="Person with money" width={600} draggable={false}/>
        </div>
    );
}
