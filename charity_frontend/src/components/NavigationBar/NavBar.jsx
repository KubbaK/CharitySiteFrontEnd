import React from "react";
import styles from './NavBar.module.scss'
import SettingsIcon from '@mui/icons-material/Settings';
import DropdownList from "../DropdownList/DropdownList";
import UserPanel from "../UserPanel/UserPanel";

class NavBar extends React.Component{
    render(){
        return(
            <nav className={styles.navbar}>
                <h1>Witaj, 123</h1>
                <DropdownList data1 = {'Zobacz akcje wolontariackie'} 
                    data2 = {'Zobacz zbiórki pieniężne'}
                        data3 = {'Zobacz wszystkie zbiórki'}
                            titlebutton = {'Przegląd akcji'}/>
                <ul className={styles.ul}>     
                    <li className={styles.li}><a >Nowa akcja</a></li>
                    <li className={styles.li}><a >Utwórz akcję</a></li> 
                </ul>
                <UserPanel/>
                <SettingsIcon className={styles.sicon}></SettingsIcon>
            </nav>
        );
    }
}

export default NavBar