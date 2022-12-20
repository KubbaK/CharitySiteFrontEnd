import {Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions } from '@mui/material'
import { useState,useEffect} from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {React} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import jwtDecode from 'jwt-decode'

const EventAdd = () => {
    const params = useParams();
    const navigate = useNavigate();
    const Eventid = params.id
    const [eventData,setEventData] = useState("")

    const [open,setOpen] = useState(false)
    const [jwtcookie,,] = useCookies(["jwt"]);
    const [fundTarget,setFundTarget] = useState("")
    const [amountOfMoneyToCollect,setAmountOfMoneyToCollect] = useState("")
    const [amountOfNeededVolunteers,setAmountOfNeededVolunteers] = useState("")
    const token = jwtcookie.jwt
    let id = null
    if(token !== undefined){
        const decoded = jwtDecode(token)
        id = decoded.Id
    }
    const addFundraising = async () =>{
        const formdata = new FormData()
        formdata.append("CharityEventId",Eventid)
        formdata.append("FundTarget",fundTarget)
        formdata.append("AmountOfMoneyToCollect",amountOfMoneyToCollect)

        let res = await axios.post("http://localhost:5012/v1/CharityEventFundraising",formdata,
        {headers:{'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}`}})
            if(res.status === 200){
                console.log("Udało się")
        }
        navigate(-2)
        setOpen(false)
    }
    const addVolunteering = async () =>{
        const formdata = new FormData()
        formdata.append("CharityEventId",Eventid)
        formdata.append("AmountOfNeededVolunteers",amountOfNeededVolunteers)
        
        let res = await axios.post("http://localhost:5012/v1/CharityEventVolunteering",formdata,
        {headers:{'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}`}})
            if(res.status === 200){
                console.log("Udało się")
        }
        navigate(-2)
        setOpen(false)
    }

    const fetchUserData = async () => {
        if(eventData.fundraisingId === null){
            addFundraising()
        }
        if(eventData.volunteeringId === null){
            addVolunteering()
        }
    }

    useEffect(() => {
        const fetchEvents = async () => {
            await axios.get("http://localhost:5012/v1/Search/"+Eventid,{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
            setEventData(response.data)
        });
        }
        fetchEvents()
        
    }, []);
    return(
        
        <><Button variant="outlined" onClick={() => setOpen(true)} color="success" style={{marginTop:'20px',marginLeft:'65px',backgroundColor:'green',color:'white',fontWeight:'bold',width:'200px',borderRadius:'20px',border:'3px solid black'}}>Dodaj kolejny moduł do akcji</Button>
            <Dialog aria-labelledby='dialog-title' aria-describedby='dialog-description' 
                open={open} onClose={() => setOpen(false)}>
                <DialogTitle style={{textAlign:'center'}} id='dialog-title'>Dodaj kolejny typ akcji</DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        <div style={{width:"520px",height:"50px",textAlign:'center'}}> Twoja akcja zyskała nową funkcjonalność? Nie musisz tworzyć nowej! 
                            Uzupełnij informacje tutaj i przekaż administratorowi do weryfikacji.</div><br/>
                        <form>
                            {eventData.fundraisingId === null &&
                            <div>
                                
                                <div><label style={{fontSize:'15px',marginLeft:'200px'}}>Podaj cel zbiórki:</label></div>
                            <textarea style={{width:'300px',height:'20px',fontWeight:'bold', marginLeft:'100px',fontSize:'20px',borderRadius:'5px',marginBottom:'10px'}}
                                value={fundTarget} spellcheck="false"
                                onChange={(e) => setFundTarget(e.target.value)} 
                            />
                            </div>}
                            {eventData.fundraisingId === null &&
                            <div>
                               
                                <div><label style={{fontSize:'15px',marginLeft:'155px'}}>Podaj ilość pieniędzy do zebrania:</label></div>
                            <textarea type="number" min="1" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();}}}  style={{width:'80px',height:'20px',fontWeight:'bold', marginLeft:'215px',fontSize:'20px',borderRadius:'5px'}}
                                value={amountOfMoneyToCollect} spellcheck="false"
                                onChange={(e) => setAmountOfMoneyToCollect(e.target.value)} 
                            />
                            </div>}
                            {eventData.volunteeringId === null && 
                            <div>
                                
                                <div><label style={{fontSize:'15px',marginLeft:'155px'}}>Podaj ilu wolontariuszy potrzeba:</label></div>
                            <textarea type="number" min="1" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();}}}  style={{width:'80px',height:'20px',fontWeight:'bold', marginLeft:'215px',fontSize:'20px',borderRadius:'5px'}}
                                value={amountOfNeededVolunteers} spellcheck="false"
                                onChange={(e) => setAmountOfNeededVolunteers(e.target.value)} 
                            />
                            </div>}
                            
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='warning' onClick={() => setOpen(false)}>Zamknij</Button>
                    <Button variant='contained' color='success' onClick={fetchUserData}>Rozszerz zbiórkę</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EventAdd