import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import {React} from 'react'
import { useCookies } from 'react-cookie'
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'

const VolunteerDialog = (props) => {
    const [open,setOpen] = useState(false)
    const [jwtcookie,,] = useCookies(["jwt"]);
    const [errorT,setError] = useState("");
    const [dataExist,setDataExist] = useState(false)
    const token = jwtcookie.jwt
    let id
    if(token !== undefined){
        const decoded = jwtDecode(token)
        id = decoded.Id
    }
    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

      useEffect(() => {
        const isData = async () => {
            axios.get("http://localhost:5012/v1/PersonalData/exists/"+id,{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
             setDataExist(response.data)
          });
        }
        isData()
    },[]);
    const fetchVolunteer = async () => { 
            setError("")
            if(dataExist === true){
            let res = await axios.post("http://localhost:5012/v1/Volunteer",{idUser:id,idVolunteering:props.props},
            {headers:{Authorization: `Bearer ${token}`}})
            .catch(function (error) {
            if(
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ){
                
                if (error.response.data.message === "This volunteer has already been assigned to this action"){
                    setError("Już zapisałes się do tej akcji!")
                }
                if (error.response.data.message !== "This volunteer has already been assigned to this action"){
                    setError("Najpierw się zaloguj!")
                }
            }
        });
        if(res.status === 200){
            setError("Zapisano do akcji!")
            await sleep(2000)
        }
        setOpen(false)
    }
    else{
        setError("Musisz dodać dane personalne w swoim profilu!")
        await sleep(2000)
        setOpen(false)
    }
    }
    return(
        <><Button variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}onClick={() => setOpen(true)} color="error">Zostań wolontariuszem</Button>
            <Dialog aria-labelledby='dialog-title' aria-describedby='dialog-description' 
                open={open} onClose={() => setOpen(false)}>
                <DialogTitle id='dialog-title'>Czy jesteś pewien?</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        <div style={{width:"350px"}}>Czy chcesz zapisać się jako wolontariusz?</div><br/>
                        <div style={{color:'red',fontWeight:'bold'}}>{errorT.length > 0 && errorT}</div>
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