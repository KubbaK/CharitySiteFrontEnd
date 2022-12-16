import React from "react";
import styles from './UserPanel.module.scss'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import jwtDecode from 'jwt-decode'
import {Link,useNavigate} from 'react-router-dom';
import {useCookies} from "react-cookie"

const UserPanel = () =>{
    const [jwtcookie,,RemoveJwtcookie] = useCookies(["jwt"]);
    const token = jwtcookie.jwt
    let roles = ""
    if(token !== undefined){
        const decoded = jwtDecode(token)
        roles = decoded.Roles
    }
    
    const navigate = useNavigate()
    const handleLogout = () =>{
        RemoveJwtcookie("jwt")
        navigate("/login")
    }
        return(
            <div className={styles.dropdown}>
                <ArrowDropDownIcon className={styles.arrowdd}/> 
                <div className={styles.ddContainer}>
                   {jwtcookie.jwt === undefined &&
                    <Stack direction="column" spacing={1} marginTop={3} alignItems="center" >
                        <Link to="/Login"><Button className={styles.button} variant="contained">Zaloguj się</Button></Link>
                        <Link to="/SignUp"><Button className={styles.button} variant="contained">Zarejestruj się</Button></Link>
                    </Stack>
                   } 
                   {(jwtcookie.jwt !== undefined && roles.includes("Volunteer") === true) &&
                     <Stack direction="column" spacing={1} marginTop={3} alignItems="center" >
                        <Link to="/userAccount"><Button className={styles.button} variant="contained">Moje konto</Button></Link>
                        <Button className={styles.button} variant="contained" onClick={handleLogout}>Wyloguj się</Button>
                     </Stack>   
                   }
                   {(jwtcookie.jwt !== undefined && roles.includes("Admin") === true) &&
                     <Stack direction="column" spacing={1} marginTop={3} alignItems="center" >
                        <Link to="/adminPanel"><Button className={styles.button} variant="contained">Panel Administratora</Button></Link>
                        <Button className={styles.button} variant="contained" onClick={handleLogout}>Wyloguj się</Button>
                     </Stack>   
                   }
                
                </div>
            </div>
        );
}

export default UserPanel
