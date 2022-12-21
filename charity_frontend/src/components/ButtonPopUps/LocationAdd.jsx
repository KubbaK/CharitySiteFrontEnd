import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material'
import { useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {React} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import jwtDecode from 'jwt-decode'

const LocationAdd = (props) => {
    const navigate = useNavigate();
    const [eventData,setEventData] = useState("")

    const [open,setOpen] = useState(false)
    const [jwtcookie,,] = useCookies(["jwt"]);
    const [postalCode,setPostalCode] = useState("")
    const [town,setTown] = useState("")
    const [street,setStreet] = useState("")
    const token = jwtcookie.jwt
    let id = null
    if(token !== undefined){
        const decoded = jwtDecode(token)
        id = decoded.Id
    }
    const addLocation = async () =>{
        const body = {
            idVolunteering: props.Eventid,
            postalCode: postalCode,
            town: town,
            street: street
        }
        
        let res = await axios.post("http://localhost:5012/v1/Location",body,
        {headers:{'Content-Type': 'application/json',Authorization: `Bearer ${token}`}})
            if(res.status === 200){
                console.log("Udało się")
        }
        navigate(-2)
        setOpen(false)
    }

    const fetchLocationData = async () => {
        addLocation()
    }

    return(
        
        <><Button variant="outlined" onClick={() => setOpen(true)} color="warning" style={{marginTop:'20px',marginLeft:'65px',backgroundColor:'rgb(249, 249, 78)',color:'black',fontWeight:'bold',height:'50px'}}>Dodaj lokalizację do akcji</Button>
            <Dialog aria-labelledby='dialog-title' aria-describedby='dialog-description' 
                open={open} onClose={() => setOpen(false)}>
                <DialogTitle style={{textAlign:'center'}} id='dialog-title'>Dodaj kolejny typ akcji</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        <div style={{width:"520px",height:"50px",textAlign:'center'}}> Dodaj lokalizacje, do której potrzebujesz wolontariuszy.</div><br/>
                        <form>
                            <div>
                                <div><label style={{fontSize:'15px',marginLeft:'185px'}}>Podaj kod pocztowy:</label></div>
                            <textarea style={{width:'300px',height:'20px',fontWeight:'bold', marginLeft:'100px',fontSize:'20px',borderRadius:'5px',marginBottom:'10px'}}
                                value={postalCode} spellcheck="false" maxLength={10}
                                onChange={(e) => setPostalCode(e.target.value)} 
                            />
                            </div>

                            <div>
                                <div><label style={{fontSize:'15px',marginLeft:'210px'}}>Podaj miasto:</label></div>
                            <textarea style={{width:'300px',height:'20px',fontWeight:'bold', marginLeft:'100px',fontSize:'20px',borderRadius:'5px',marginBottom:'10px'}}
                                value={town} spellcheck="false" onKeyPress={(event) => {if (!/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(event.key)) {
                                    event.preventDefault();}}}
                                onChange={(e) => setTown(e.target.value)} 
                            />
                            </div>

                            <div>
                                <div><label style={{fontSize:'15px',marginLeft:'218px'}}>Podaj ulicę:</label></div>
                            <textarea style={{width:'300px',height:'20px',fontWeight:'bold', marginLeft:'100px',fontSize:'20px',borderRadius:'5px',marginBottom:'10px'}}
                                value={street} spellcheck="false"
                                onChange={(e) => setStreet(e.target.value)} 
                            />
                            </div>
                            
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='warning' onClick={() => setOpen(false)}>Zamknij</Button>
                    <Button variant='contained' color='success' onClick={fetchLocationData}>Dodaj lokację</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LocationAdd