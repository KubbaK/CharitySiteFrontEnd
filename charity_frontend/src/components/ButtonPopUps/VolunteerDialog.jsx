import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import {React} from 'react'
import { useCookies } from 'react-cookie'
import jwtDecode from 'jwt-decode'

const VolunteerDialog = (props) => {
    const [open,setOpen] = useState(false)
    const [jwtcookie,,] = useCookies(["jwt"]);
    const token = jwtcookie.jwt
    let id
    if(token !== undefined){
        const decoded = jwtDecode(token)
        id = decoded.Id
    }

    const fetchVolunteer = async () => {
        let res = axios.post("http://localhost:5012/v1/Volunteer",{idUser:id,idVolunteering:props.props},
            {headers:{Authorization: `Bearer ${token}`}})
            if(res.status === 200){
                console.log("Udało się")
            }
        setOpen(false)
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
                    <Button onClick={fetchVolunteer}>Zapisz mnie!</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default VolunteerDialog