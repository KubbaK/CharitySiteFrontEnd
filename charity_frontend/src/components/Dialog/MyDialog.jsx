// MIT License
// Copyright (c) 2014 Call-Em-All, https://v4.mui.com/

import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material'
import {React, useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const MyDialog = (props) => {
    const [open,setOpen] = useState(false)
    const exit = () =>
    {
        setOpen(false)
        props.setShowOpened(false)
    }
    useEffect(() => {
        setOpen(props.open);
    }, [props.open])
    return(
        <>
            <Dialog aria-labelledby='dialog-title' aria-describedby='dialog-description' 
                open={open} onClose={() => setOpen(false)}>
                <DialogTitle id='dialog-title'>Nie możesz wykonać tej akcji</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        Nie jesteś zalogowany! Jeśli chcesz kontynuować zaloguj się lub załóż nowe konto.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={exit}>Wróć</Button>
                    <Link to="/login"><Button onClick={exit}>Strona logowania</Button></Link>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MyDialog