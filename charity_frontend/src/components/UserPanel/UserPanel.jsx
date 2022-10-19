import React from "react";
import styles from './UserPanel.module.scss'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { style } from "@mui/system";

class UserPanel extends React.Component{
    render(){
        return(
            <div className={styles.dropdown}>
                <ArrowDropDownIcon className={styles.arrowdd}/> 
                <div className={styles.ddContainer}>
                <Stack direction="column" spacing={1}>
                    <Button className={styles.button} variant="contained">Moje konto</Button>
                    <Button className={styles.button} variant="contained">Wyloguj się</Button>
                </Stack>
                </div>
            </div>
        );
    }
}

export default UserPanel
