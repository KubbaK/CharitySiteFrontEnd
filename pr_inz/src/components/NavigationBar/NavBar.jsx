import React from "react";
import styles from './NavBar.module.scss'
import SettingsIcon from '@mui/icons-material/Settings';

class NavBar extends React.Component{
    render(){
        return(
            <nav className={styles.navbar}>
                <h1>Witaj, 123</h1>
                <div className={styles.dropdown}>
                        <a href="#" >Przegląd akcji</a>
                        <div className={styles.dropdownContent}>
                            <a href="#">Zobacz akcje wolontariackie</a>
                            <a href="#">Zobacz zbiórki pieniężne</a>
                            <a href="#">Zobacz wszystkie zbiórki</a>
                        </div>
                    </div>
                <ul className={styles.ul}>     
                    <li className={styles.li}><a >Nowa akcja</a></li>
                    <li className={styles.li}><a >Utwórz akcję</a></li> 
                </ul>
                <SettingsIcon className={styles.sicon}></SettingsIcon>
            </nav>
        );
    }
}

export default NavBar