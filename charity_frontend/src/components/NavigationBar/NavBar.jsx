import React,{useEffect,useState} from 'react';
import axios from "axios"
import {Link} from 'react-router-dom';
import styles from './NavBar.module.scss'
import SettingsIcon from '@mui/icons-material/Settings';
import DropdownList from "../DropdownList/DropdownList";
import UserPanel from "../UserPanel/UserPanel";
import {useCookies} from "react-cookie"
import MyDialog from '../Dialog/MyDialog';

const NavBar = (props) =>{
    const [opened, setShowOpened] = useState(false);
    const [jwtcookie,,RemoveJwtcookie] = useCookies(["jwt"]);

    const [error, setError] = useState("")
    const [data, getData] = useState([])
    useEffect(() => {
        async function getDataSet() {
        try {
            const url = "http://localhost:5012/v1/"
            let res = await axios.get(url)
            res = await res.json()
            getData(res)
            console.log(res.message)
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
    getDataSet()
},[])
        return(
            <nav className={styles.navbar}>
                <h1>Witaj, {}</h1>
                <DropdownList data1 = {'Zobacz akcje wolontariackie'} 
                    data2 = {'Zobacz zbiórki pieniężne'}
                        data3 = {'Zobacz wszystkie zbiórki'}
                            titlebutton = {'Przegląd akcji'}/>
                <ul className={styles.ul}>
                    { jwtcookie.jwt !== undefined &&     
                        <li className={styles.li}><Link to="/form" style={{textDecoration: 'none'}}>Utwórz akcję</Link></li>
                    } 
                    { jwtcookie.jwt === undefined &&
                           <li className={styles.li} onClick={() => setShowOpened(true)}><Link to="" style={{textDecoration: 'none'}}>Utwórz akcję</Link></li>
                    }   
                    <li className={styles.spacer}><p></p></li>
                    <li className={styles.li}><Link to="/" style={{textDecoration: 'none'}}>Strona główna</Link></li>
                     
                </ul>
                <UserPanel/>
                <SettingsIcon className={styles.sicon}></SettingsIcon>
                <MyDialog open={opened}/>
            </nav>
        );
}

export default NavBar


