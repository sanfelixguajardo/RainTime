import LoginCSS from '../styles/Login.module.css'
import {useRef, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

// svg
import UserSolidSvg from "./svg/UserSolidSvg";
import LockSolidSvg from "./svg/LockSolidSvg";
import {CSSProvider} from "../Context/CSSProvider";

const LOGIN_URL = '/auth';


const Login = () => {

    const {setAuth} = useAuth();

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState((''));
    const [pwd, setPwd] = useState((''));
    const [errMsg, setErrMsg] = useState((''));
    const [loginSubmitted, setLoginSubmitted] = useState(false);

    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoginSubmitted(true);
        setErrMsg('');

        try {

            const response = await axios.post(

                LOGIN_URL,
                JSON.stringify({username: user, pwd: pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            const accessToken = response?.data?.accessToken;

            setAuth({user, accessToken});
            setUser('');
            setPwd('');

            //navigate(from, {replace: true});
            navigate(-1);

        } catch(err) {
            if (!err?.response)
            {
                setErrMsg('No server response');

            } else if (err.response?.status === 400)
            {
                setErrMsg('Missing Username or Password');

            } else if (err.response?.status === 401)
            {
                setErrMsg('Unauthorized');
            }
            errRef?.current?.focus();

            setLoginSubmitted(false);
        }
    }

    return (

        <CSSProvider cssModule={LoginCSS}>
            <section>
                <div className={LoginCSS.container}>
                    <div className={LoginCSS.form}>
                        <p ref={errRef} className={errMsg ? LoginCSS.errMsg : "offscreen"} aria-live="assertive"> {errMsg} </p>

                        <h1 className={LoginCSS.h1}>Sign In</h1>

                        <form onSubmit={handleSubmit}>
                            <div className={LoginCSS.inputContainer}>
                                <input className={LoginCSS.input}
                                    type={"text"}
                                    id={"username"}
                                    ref={userRef}
                                    autoComplete={"off"}
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                />
                                <label className={LoginCSS.label} htmlFor={"username"}>Username:</label>
                                <UserSolidSvg />
                            </div>

                            <div className={LoginCSS.inputContainer}>
                                <input className={LoginCSS.input}
                                    type={"password"}
                                    id={"username"}
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                />
                                <label className={LoginCSS.label} htmlFor={"password"}>Password:</label>
                                <LockSolidSvg />
                            </div>

                            <button className={LoginCSS.button}>Sign In</button>
                        </form>
                    </div>
                </div>

                {!errMsg && loginSubmitted && (

                    <div className={LoginCSS.blockingScreen}>
                    </div>
                )}

            </section>
        </CSSProvider>
    );
}

export default Login