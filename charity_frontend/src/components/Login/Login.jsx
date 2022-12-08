import React, { useState } from "react"
import {useCookies} from "react-cookie"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./Login.module.scss"
import NavBar from "../NavigationBar/NavBar.jsx"
import Footer from "../Footer/Footer"

const Login = () => {
    const [data, setData] = useState({
        loginOrEmail: "",
        password: "",
    })
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
    const [error, setError] = useState("")
    const [, setJwtcookie] = useCookies(["jwt"]);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:5012/v1/Account/login"
            const { data: res } = await axios.post(url, data)
            setJwtcookie("jwt",res,{ path: '/' })
            navigate("/")
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }
    const text = " Nie masz konta? \n Zarejestruj się!";
    return (
        <div className={styles.loginPage}> 
        <NavBar/>
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                
                <div className={styles.center}>
                    <form className={styles.form_container}
                        onSubmit={handleSubmit}>
                        <h1>Logowanie</h1>
                        
                        <input 
                            type="text"
                            placeholder="Login/Email"
                            name="loginOrEmail"
                            onChange={handleChange}
                            value={data.loginOrEmail}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Hasło"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {error && <div
                            className={styles.error_msg}>{error}</div>}
                        <button type="submit"
                            className={styles.blue_btn}>
                            Zaloguj się
                        </button>
                    </form>
                </div>
                <div className={styles.bottom}>
                    
                    <h1>{text}</h1>
                    <Link to="/signup" style={{textDecoration: 'none'}}>
                        <button type="button"
                            className={styles.login_btn}>
                            Zarejestruj się
                        </button>
                    </Link>
                </div>
               
            </div> 
               
        </div>          
        </div>
        
    );
};
export default Login