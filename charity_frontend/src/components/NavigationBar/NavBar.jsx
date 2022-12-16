import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './NavBar.module.scss'
import SettingsIcon from '@mui/icons-material/Settings';
import DropdownList from "../DropdownList/DropdownList";
import UserPanel from "../UserPanel/UserPanel";
import jwtDecode from 'jwt-decode'
import {useCookies} from "react-cookie"
import MyDialog from '../Dialog/MyDialog';

const NavBar = () =>{
    const [opened, setShowOpened] = useState(false);
    const [jwtcookie,setJwtcookie,] = useCookies(["jwt"]);
    setJwtcookie({secure: true,sameSite:'none'})
    const token = jwtcookie.jwt
    console.log(token)
    let login = ""
    if (token !== undefined)
    {
        const decoded = jwtDecode(token)
        login = decoded.Roles
    }
        return(
            <nav className={styles.navbar}>
                 {jwtcookie.jwt !== undefined && 
                    <h1>Witaj, {login} </h1>
                 }
                 {jwtcookie.jwt === undefined && 
                    <h1>Witaj, gościu! </h1>
                 }
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
                    <li className={styles.lis}><Link to="/" style={{textDecoration: 'none'}}>Strona główna</Link></li>
                     
                </ul>
                <UserPanel/>
                <SettingsIcon className={styles.sicon}></SettingsIcon>
                <MyDialog open={opened} setShowOpened={setShowOpened}/>
            </nav>
        );
}

export default NavBar


