import React from "react";
import styles from './UserPanel.module.scss'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Link,Navigate, useNavigate} from 'react-router-dom';
import {useCookies} from "react-cookie"

const UserPanel = () =>{
    const [jwtcookie,,RemoveJwtcookie] = useCookies(["jwt"]);
    const navigate = useNavigate()
    const handleLogout = () =>{
        RemoveJwtcookie("jwt")
        navigate("/login")
    }
        return(
            <div className={styles.dropdown}>
                <ArrowDropDownIcon className={styles.arrowdd}/> 
                <div className={styles.ddContainer}>
                   {jwtcookie.jwt == undefined &&
                    <Stack direction="column" spacing={1} marginTop={3} alignItems="center" >
                        <Link to="/Login"><Button className={styles.button} variant="contained">Zaloguj się</Button></Link>
                        <Button className={styles.button} variant="contained">Zarejestruj się</Button>
                    </Stack>
                   } 
                   {jwtcookie.jwt != undefined &&
                     <Stack direction="column" spacing={1} marginTop={3} alignItems="center" >
                        <Link to="/Login"><Button className={styles.button} variant="contained">Moje konto</Button></Link>
                        <Button className={styles.button} variant="contained" onClick={handleLogout}>Wyloguj się</Button>
                     </Stack>   
                   }
                
                </div>
            </div>
        );
}

export default UserPanel
