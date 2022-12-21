import React, { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./SignUp.module.scss"
import NavBar from "../NavigationBar/NavBar.jsx"
const SignUp = () => {
    const [data, setData] = useState({
        login: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [errorT, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:5012/v1/Account/register"
            const { data: res } = await axios.post(url, data)
            navigate("/login")
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                if (error.response.data.errors.Login){
                    setError(error.response.data.errors.Login[0])
                }
                else if (error.response.data.errors.Email){
                    setError(error.response.data.errors.Email[0])
                }
                else if (error.response.data.errors.Password){
                    setError(error.response.data.errors.Password[0])
                }
                else if (error.response.data.errors.ConfirmPassword){
                    setError(error.response.data.errors.ConfirmPassword[0])
                }
                
            }
        }
    }
    const text = "Założyłeś już konto? \n Zaloguj się!";
    return (
        <div>
        <NavBar/>
        <div className={styles.signup_container}>
            
            <div className={styles.signup_form_container}>
                
                <div className={styles.center}>
                    <form className={styles.form_container}
                        onSubmit={handleSubmit}>
                        <h1>Zakładanie konta</h1>
                        <input type="text"
                        placeholder="Login"
                        name="login"
                        onChange={handleChange}
                        value={data.login}
                        required
                        className={styles.input}/>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
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
                        <input
                            type="password"
                            placeholder="Powtórz hasło"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={data.confirmPassword}
                            required
                            className={styles.input}
                        />
                        
                        <button type="submit"
                            className={styles.blue_btn} onClick={() => setError("")}>
                            Zarejestruj się
                        </button>
                        {errorT && <div
                            className={styles.error_msg}>{errorT}</div>}
                    </form>
                </div>
                <div className={styles.bottom}>
                    
                    <h1>{text}</h1>
                    <Link to="/login" style={{textDecoration: 'none'}}>
                        <button type="button"
                            className={styles.login_btn}>
                            Zaloguj się
                        </button>
                    </Link>
                </div>
            </div> 
        </div>                
        </div>
        
    );
};
export default SignUp