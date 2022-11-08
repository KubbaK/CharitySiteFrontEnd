import React from "react"
import NavBar from "../NavigationBar/NavBar.jsx"
import EventContainer from "../EventContainer/EventContainer.jsx";
import styles from './MainPage.module.scss'
import { useCookies } from "react-cookie";

const MainPage = (props) =>{
    const [jwtcookie] = useCookies(['jwt'])
    console.log(jwtcookie.jwt)
    return(
        <div className={styles.page}>
            <NavBar/>
            <h1 className={styles.h1}>Popularne zbiórki</h1>
            <div className={styles.event}>
                <EventContainer/>
            </div>
            
        </div> 
    );
}

export default MainPage