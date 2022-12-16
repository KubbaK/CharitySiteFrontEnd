import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material'
import { useState,useEffect } from 'react'
import {React} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const PersonalDataEdit = () => {
    const [open,setOpen] = useState(false)
    const [jwtcookie,,] = useCookies(["jwt"]);
    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("")
    const [postalCode,setPostalCode] = useState("")
    const [town,setTown] = useState("")
    const [street,setStreet] = useState("")
    const [houseNumber,setHouseNumber] = useState("")
    const [flatNumber,setFlatNumber] = useState("")
    const token = jwtcookie.jwt
    let id = null
    const navigate = useNavigate()
    if(token !== undefined){
        const decoded = jwtDecode(token)
        id = decoded.Id
    }
    useEffect(() => {
        const fetchData = () => {
             axios.get("http://localhost:5012/v1/PersonalData/"+id,{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {  
            setName(response.data.name)
            setSurname(response.data.surname)
            setEmail(response.data.email)
            setPhoneNumber(response.data.phoneNumber)
            setPostalCode(response.data.postalCode)
            setTown(response.data.town)
            setStreet(response.data.street)
            setHouseNumber(response.data.houseNumber)
            setFlatNumber(response.data.flatNumber)
          });
        }
        fetchData()
    },[]);
    const fetchUserData = async () => {
        let res = axios.put("http://localhost:5012/v1/PersonalData/"+id,
        {
            name:name,
            surname:surname,
            email:email,
            phoneNumber:phoneNumber,
            postalCode:postalCode,
            town:town,
            street:street,
            houseNumber:houseNumber,
            flatNumber:flatNumber

    },{headers:{Authorization: `Bearer ${token}`}})
    navigate('/')
    }
    return(
        
        <><Button variant="outlined" onClick={() => setOpen(true)} color="success" style={{marginTop:'20px',marginLeft:'30px',backgroundColor:'yellowgreen'}}>Edytuj swoje dane</Button>
            <Dialog aria-labelledby='dialog-title' aria-describedby='dialog-description' 
                open={open} onClose={() => setOpen(false)}>
                <DialogTitle id='dialog-title'>Edytuj podane dane osobowe</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        <div style={{width:"500px",height:"50px",textAlign:'center'}}>Coś się zmieniło? Uzupełnij informacje o sobie, byśmy mogli pozostać z tobą w kontakcie.</div><br/>
                        <form>
                            <div>
                                <label style={{fontSize:'13px',marginLeft:'45px',fontWeight:'bolder'}}>DANE OSOBOWE</label>
                                <div><label style={{fontSize:'13px',marginLeft:'45px'}}>Podaj imię:</label>
                                <label style={{fontSize:'13px',marginLeft:'140px'}}>Podaj nazwisko:</label></div>
                            <textarea style={{width:'150px',height:'20px',fontWeight:'bold', marginLeft:'45px',fontSize:'20px'}}
                                value={name} spellcheck="false" 
                                onChange={(e) => setName(e.target.value)} 
                            />
                            
                            <textarea style={{width:'200px',height:'20px',fontWeight:'bold', marginLeft:'45px',fontSize:'20px'}} type='number' onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();}}} 
                                value={surname} spellcheck="false"
                                onChange={(e) => setSurname(e.target.value)} 
                            />
                            </div>
                            <div>
                                <div><label style={{fontSize:'13px',marginLeft:'45px'}}>Podaj email:</label>
                                <label style={{fontSize:'13px',marginLeft:'132px'}}>Podaj numer telefonu:</label></div>
                            <textarea style={{width:'150px',height:'20px',fontWeight:'bold', marginLeft:'45px',fontSize:'20px'}}
                                value={email} spellcheck="false"
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            
                            <textarea style={{width:'200px',height:'20px',fontWeight:'bold', marginLeft:'45px',fontSize:'20px'}} type='number' onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();}}} 
                                value={phoneNumber} spellcheck="false"
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                            />
                            </div>
                            <div>
                            <label style={{fontSize:'13px',marginLeft:'45px',fontWeight:'bolder'}}>ADRES ZAMIESZKANIA</label>
                                <div><label style={{fontSize:'13px',marginLeft:'45px'}}>Podaj kod pocztowy:</label>
                                <label style={{fontSize:'13px',marginLeft:'84px'}}>Podaj miejscowość:</label></div>
                            <textarea style={{width:'150px',height:'20px',fontWeight:'bold', marginLeft:'45px',fontSize:'20px'}}
                                value={postalCode} spellcheck="false"
                                onChange={(e) => setPostalCode(e.target.value)} 
                            />
                            
                            <textarea style={{width:'200px',height:'20px',fontWeight:'bold', marginLeft:'45px',fontSize:'20px'}} type='number'  
                                value={town} spellcheck="false"
                                onChange={(e) => setTown(e.target.value)} 
                            />
                            </div>
                            <div>
                            
                                <div><label style={{fontSize:'13px',marginLeft:'95px'}}>Podaj ulicę:</label>
                                <label style={{fontSize:'13px',marginLeft:'85px'}}>Nr domu:</label>
                                <label style={{fontSize:'13px',marginLeft:'39px'}}>Nr mieszkania*:</label></div>
                            <textarea style={{width:'150px',height:'20px',fontWeight:'bold', marginLeft:'45px',fontSize:'20px'}}
                                value={street} spellcheck="false"
                                onChange={(e) => setStreet(e.target.value)} 
                            />
                            
                            <textarea style={{width:'50px',height:'20px',fontWeight:'bold', marginLeft:'45px',fontSize:'20px'}} type='number' onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();}}} 
                                value={houseNumber} spellcheck="false"
                                onChange={(e) => setHouseNumber(e.target.value)} 
                            />

                            <textarea style={{width:'50px',height:'20px',fontWeight:'bold', marginLeft:'35px',fontSize:'20px'}} type='number' onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();}}} 
                                value={flatNumber} spellcheck="false"
                                onChange={(e) => setFlatNumber(e.target.value)} 
                            />
                            </div>
                            <div style={{marginTop:'20px'}}>* nie wymagane</div>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Zamknij</Button>
                    <Button onClick={fetchUserData}>Dodaj swoje dane</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default PersonalDataEdit




