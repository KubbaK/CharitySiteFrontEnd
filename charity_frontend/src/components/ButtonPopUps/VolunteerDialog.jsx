import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import {React} from 'react'
import { useCookies } from 'react-cookie'

const VolunteerDialog = (props) => {
    const [open,setOpen] = useState(false)
    const [jwtcookie,,] = useCookies(["jwt"]);
    const token = jwtcookie.jwt
    const fetchVolunteer = async () => {
        axios.post("http://localhost:5012/v1/Volunteer/",{headers:{Authorization: `Bearer ${token}`}},)
    }
    return(
        <><Button variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}onClick={() => setOpen(true)} color="error">Zostań wolontariuszem</Button>
            <Dialog aria-labelledby='dialog-title' aria-describedby='dialog-description' 
                open={open} onClose={() => setOpen(false)}>
                <DialogTitle id='dialog-title'>Czy jesteś pewien?</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        <div style={{width:"350px"}}>Czy chcesz zapisać się jako wolontariusz?</div><br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cofnij</Button>
                    <Button onClick={() => setOpen(false)}>Zapisz mnie!</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default VolunteerDialog