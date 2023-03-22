import { Outlet, useLoaderData } from "react-router-dom";
import { useLocalStorage } from "../hooks";
import { assets } from '../assets'
import { Nav } from '../components'

export function mainLoader() {
    const userName = useLocalStorage('userName')
    return { userName }
}

export function Main() {

    const { userName } = useLoaderData()

    return (
        <div className="layout">
        <Nav userName={userName}/>
            <main>
                <Outlet/>
            </main>
            <img src={assets.wave} alt="wave"/>
        </div>
    );
}
