import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material'
import { useState } from 'react'
import {React} from 'react'

const Regulamin = () => {
    const [open,setOpen] = useState(false)
    return(
        <>
            <Button style={{color:'white',fontWeight:'bold'}} onClick={() => setOpen(true)}>Regulamin</Button>
            <Dialog aria-labelledby='dialog-title' aria-describedby='dialog-description' 
                open={open} onClose={() => setOpen(false)}>
                <DialogTitle id='dialog-title'>Regulamin</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        <ul>
                            <li>Użytkownik może założyć konto w serwisie i korzystać z jego usług</li>
                            <li>Użytkownik może 123</li>
                            <li>Użytkownik może 123</li>
                            <li>Użytkownik może 123</li>
                        </ul>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Zamknij</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Regulamin