// MIT License
// Copyright (c) 2014 Call-Em-All, https://v4.mui.com/

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
                <DialogContent >
                    <DialogContentText id='dialog-description' >
                        <ul style={{listStyleType: 'none',marginLeft:'-20px',fontWeight:'bold'}}>
                            <li style={{margin:'5px 0'}}>1. Rejestracja oraz korzystanie z serwisu są dobrowolne i bezpłatne.</li>
                            <li style={{margin:'5px 0'}}>2. Każdy Użytkownik korzystający z serwisu zobowiązany jest do zapoznania się z Regulaminem i akceptacji jego treści.</li>
                            <li style={{margin:'5px 0'}}>3. W celu prawidłowego korzystania z funkcjonalności serwisu, niezbędne jest połączenie internetowe.</li>
                            <li style={{margin:'5px 0'}}>4. Zabronione jest umieszczanie treści o charakterze wzywającym do nienawiści oraz treści o charakterze sprzecznym z dobrymi obyczajami.</li>
                            <li style={{margin:'5px 0'}}>5. Zabronione jest umieszczanie materiałów o charakterze reklamowym, promocyjnym i marketingowym.</li>
                            <li style={{margin:'5px 0'}}>6. Kwota przekazana jako darowizna nie podlega zwrotowi.</li>
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