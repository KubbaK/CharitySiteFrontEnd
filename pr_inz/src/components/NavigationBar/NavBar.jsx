import React from "react";
import styles from './NavBar.module.scss'
import SettingsIcon from '@mui/icons-material/Settings';

class NavBar extends React.Component{
    render(){
        return(
            <nav className={styles.navbar}>
                <h1>Witaj, 123</h1>
                
                <ul className={styles.ul}>  
                    <div className={styles.dropdown}>
                        <li className={styles.li}><a >Przegląd akcji</a></li>
                        <div className={styles.dropdownContent}>
                            <a href="#">JEDEN</a>
                            <a href="#">JEDEN</a>
                            <a href="#">JEDEN</a>
                        </div>
                    </div>
                    <li className={styles.li}><a >Przegląd akcji</a></li>
                    <li className={styles.li}><a >Utwórz akcję</a></li>
                </ul>
                <SettingsIcon className={styles.sicon}></SettingsIcon>
            </nav>
        );
    }
}

export default NavBar