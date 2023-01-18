// MIT License
// Copyright (c) 2014 Call-Em-All, https://v4.mui.com/

import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material'
import { useState } from 'react'
import {React} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import jwtDecode from 'jwt-decode'

const DonationDialog = (props) => {

    const error_msg = {
        width: "772px",
        padding: '14px',
        margin: '-15px 0',
        fontSize: '14px',
        backgroundColor: '#f34646',
        color: 'white',
        borderRadius: '0px 0px 10px 10px',
        textAlign: 'center'
    };


    const [errorT, setError] = useState("")
    const [open,setOpen] = useState(false)
    const [jwtcookie,,] = useCookies(["jwt"]);
    const [donate,setDonate] = useState(1);
    const [description,setDescription] = useState("...");
    const token = jwtcookie.jwt
    let id = null
    if(token !== undefined){
        const decoded = jwtDecode(token)
        id = decoded.Id
    }
    const fetchDonation = async () => {
    
        let res = axios.post("http://localhost:5012/v1/Donation",
        {
            amountOfDonation:donate,
            description:description,
            idUser:id,
            idCharityFundraising:props.props
    },{headers:{Authorization: `Bearer ${token}`}})
            if(res.status === 200){
                
            }
            setOpen(false)
            setDescription("")
            setDonate(0)
            window.open("/successDonate")
}
    return(
        <><Button variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}onClick={() => setOpen(true)} color='info' >Wpłać Darowiznę</Button>
            <Dialog aria-labelledby='dialog-title' aria-describedby='dialog-description' 
                open={open} onClose={() => setOpen(false)}>
                <DialogTitle style={{textAlign:'center'}} id='dialog-title'>Pomoc finansowa</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        <div style={{width:"450px",height:"50px",textAlign:'center'}}>Jaką kwotą chcesz wspomóc wybraną akcję?</div><br/>
                        <form>
                            <textarea style={{width:'350px',height:'80px',fontWeight:'bold', marginLeft:'45px'}}
                                placeholder="Podaj wiadomość do donacji" 
                                value={description} spellcheck="false"
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                            <div style={{marginLeft:'65px',marginBottom:'20px',marginTop:'20px'}} ><Button variant="contained" color="success" style={{fontWeight:'bold',marginRight:'20px'}} onClick={() => setDonate(10)} >10</Button>
                            <Button variant="contained" color="success" style={{fontWeight:'bold',marginRight:'20px'}} onClick={() => setDonate(20)} >20</Button>
                            <Button variant="contained" color="success" style={{fontWeight:'bold',marginRight:'20px'}} onClick={() => setDonate(50)} >50</Button>
                            <Button variant="contained" color="success" style={{fontWeight:'bold',marginRight:'20px'}} onClick={() => setDonate(100)} >100</Button></div>
                            <input style={{width:'150px',height:'35px',fontWeight:'bold', marginLeft:'140px'}} type='number' min={1} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();}}}  
                                value={donate}
                                onChange={(e) => setDonate(e.target.value)} 
                            /> zł
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="warning" onClick={() => setOpen(false)}>Cofnij</Button>
                    <Button variant="contained" color="success" onClick={fetchDonation}>Dodaj donację</Button>
                </DialogActions>
                {errorT && <div
                            style={error_msg}>{errorT}</div>
            }
            </Dialog>
        </>
    )
}

export default DonationDialog