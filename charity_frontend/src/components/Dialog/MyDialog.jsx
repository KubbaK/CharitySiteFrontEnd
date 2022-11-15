import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material'
import {React, useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const MyDialog = (props) => {
    const [open,setOpen] = useState({...props.open})
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
                    <Button onClick={() => setOpen(false)}>Wróć</Button>
                    <Link to="/login"><Button onClick={() => setOpen(false)}>Strona logowania</Button></Link>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MyDialog