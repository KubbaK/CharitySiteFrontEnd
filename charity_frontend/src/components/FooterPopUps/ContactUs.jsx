import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material'
import { useState } from 'react'
import {React} from 'react'

const ContactUs = () => {
    const [open,setOpen] = useState(false)
    return(
        <>
            <Button style={{color:'black',fontWeight:'bold'}} onClick={() => setOpen(true)}>Skontaktuj się z nami</Button>
            <Dialog aria-labelledby='dialog-title' aria-describedby='dialog-description' 
                open={open} onClose={() => setOpen(false)}>
                <DialogTitle id='dialog-title'>Dane kontakowe</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        <div style={{width:"300px"}}>Email: strona@email.com</div><br/>
                        <div>Telefon: 543 654 765</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Zamknij</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ContactUs