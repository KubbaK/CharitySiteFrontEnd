import React from "react"
import styles from "./EventTypeChoose.module.scss"
import NavBar from "../NavigationBar/NavBar.jsx"
import { Link } from "react-router-dom"

const EventTypeChoose = () => {
    return (
        <div className={styles.fullscreen}>
            <NavBar/>
            <div className={styles.first}>
                <Link to="/getFundraising"><div className={styles.overlay}>
                   <div className={styles.text}>Akcje pieniężne</div>
                </div></Link>
            </div>
            <div className={styles.second}>
                <Link to="/getVolunteering"><div className={styles.overlay}>
                    <div className={styles.text}>Akcje wolontariackie</div>
                </div></Link>
            </div>
            <div className={styles.back}>
             <Link to="/getEvents"><div className={styles.overlay}>
                <div className={styles.text}>Wszystkie akcje</div>
                </div></Link>
            </div>
        </div>
    );
}

export default EventTypeChoose