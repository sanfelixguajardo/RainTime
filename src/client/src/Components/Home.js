import HomeCSS from '../styles/Home.module.css'

import {NavLink} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import {CSSProvider} from "../Context/CSSProvider";
const LOGOUT_URL = '/logout';



const Home = () => {

    const { auth, setAuth } = useAuth();
    const handleLogout = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.get(
                LOGOUT_URL,
                {
                    withCredentials: true
                }
            );

            setAuth({}); // Empty out authorization state

        } catch (err) {
            if (!err?.response) {
                console.log('No server response');
            }
        }
    }

    return (
        <CSSProvider cssModule={HomeCSS}>
            <main>
                { !auth?.user ? <NavLink className={HomeCSS.accessLink} to={"login"}>Access</NavLink> : <p className={HomeCSS.msg}>Already signed In</p> }
                { auth?.user && <button className={HomeCSS.logoutButton} onClick={handleLogout}>Log-out</button> }
            </main>
        </CSSProvider>
    )
}

export default Home