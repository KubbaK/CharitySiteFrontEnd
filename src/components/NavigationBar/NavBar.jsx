import React from "react";
import styles from './NavBar.module.scss'

class NavBar extends React.Component{
    render(){
        return(
            <nav className={styles.navbar}>
                <h1>Witaj, 123</h1>
                
                <ul className={styles.ul}>
                    <div className={styles.dropdown}>
                        <li className={styles.li}><a >asdsadsadsddddh</a></li>
                        <div className={styles.dropdownContent}>
                            <a href="#">JEDEN</a>
                            <a href="#">JEDEN</a>
                            <a href="#">JEDEN</a>
                        </div>
                    </div>
                    <li className={styles.li}><a >dfsgfdg</a></li>
                </ul>
            </nav>
        );
    }
}

export default NavBar