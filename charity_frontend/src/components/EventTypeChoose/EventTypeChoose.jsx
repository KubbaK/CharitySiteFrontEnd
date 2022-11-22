import React from "react"
import styles from "./EventTypeChoose.module.scss"
import NavBar from "../NavigationBar/NavBar.jsx"
import { Link } from "react-router-dom"

const EventTypeChoose = () => {
    return (
        <div className={styles.fullscreen}>
            <NavBar/>
            <div className={styles.first}>
                <div className={styles.overlay}>
                    <Link to="/getEvents"><div className={styles.text}>Akcje pieniężne</div></Link>
                </div>
            </div>
            <div className={styles.second}>
                <div className={styles.overlay}>
                    <div className={styles.text}>Akcje wolontariackie</div>
                </div>
            </div>
            <div className={styles.back}>
            <div className={styles.overlay}>
                    <div className={styles.text}>Wszystkie akcje</div>
                </div>
            </div>
        </div>
    );
}

export default EventTypeChoose