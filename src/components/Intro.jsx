import { Form } from "react-router-dom";
import { assets } from '../assets'
import { AiOutlineUserAdd } from 'react-icons/ai'

export function Intro() {
    return (
        <div className="intro">
            <div>
                <h1>
                    Controle <span className="accent">seu dinheiro</span>
                </h1>
                <p>
                    O planejamento financeiro pessoal é o segredo para a liberdade financeira. Comece sua jornada hoje mesmo.
                </p>
                <Form method="post">
                    <input
                        type='text'
                        name="userName"
                        required
                        placeholder="Qual é o seu nome?"
                        aria-label="Seu nome"
                        autoComplete="off"
                    />
                    <input type="hidden" name="_action" value="newUser" />
                    <button type="submit" className="btn btn--dark">
                        <span>Criar conta</span>
                        <AiOutlineUserAdd width={20} />
                    </button>
                </Form>
            </div>
            <img src={assets.illustration} alt="Pessoa com dinheiro" width={600} draggable={false} />
        </div>
    );
}
