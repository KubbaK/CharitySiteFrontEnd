import React,{useState,useEffect} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import styles from "./UserView.module.scss"
import { Link, useParams } from "react-router-dom";
import EventCarousel from "../EventCarousel/EventCarousel";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import GetDonationsById from "../GetDonationsById/GetDonationsById";
import GetVolunteersById from "../GetVolunteersById/GetVolunteersById";
import Footer from "../Footer/Footer";
import NavBar from "../NavigationBar/NavBar";
import LocationAdd from "../ButtonPopUps/LocationAdd";
import GetLocationsByIdVolunteering from "../GetLocationsByIdVolunteering/GetLocationsByIdVolunteering"

const UserView = () => {
    const params = useParams();
    const id = params.id
    const [jwtcookie,,] = useCookies(["jwt"]);
    const token = jwtcookie.jwt
    const [eventData, setEventData] = useState([]);
    const [photos,setPhotos]= useState([]);
    const navigate = useNavigate();
    const goBack = () =>{
      navigate(-2)
    }
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    useEffect(() => {
        const fetchEvents = async () => {
            axios.get("http://localhost:5012/v1/Search/"+id,{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
             setEventData(response.data)
          });
        }
        const fetchPhotos = async () => {
            axios.get("http://localhost:5012/v1/CharityEvent/images/"+id,{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
             setPhotos(response.data)
          });
        }
     fetchEvents()
     fetchPhotos()
    },[]);
    const deactivate = async () => {
        await deactivateAll().then(await sleep(700)).then(await deactivateFundraising()).then(await sleep(500)).then(await deactivateVolunteering()).then(navigate(-2).then(sleep(300)).then(navigate(0)))
    }
    const deactivateF = async () => {
        await deactivateFundraising().then(await sleep(500)).then(navigate(-2).then(sleep(300)).then(navigate(0)))
    }
    const deactivateV = async () => {
        await deactivateVolunteering().then(await sleep(500)).then(navigate(-2).then(sleep(300)).then(navigate(0)))
    }
    const deactivateAll = async () => {
         axios({method:'patch',url:`http://localhost:5012/v1/CharityEvent/${eventData.idCharityEvent}?isActive=false`,headers:{Authorization: `Bearer ${token}`}})
         
    }
    const deactivateFundraising = async () => {
        axios({method:'patch',url:`http://localhost:5012/v1/CharityEventFundraising/${eventData.fundraisingId}?isActive=false`,headers:{Authorization: `Bearer ${token}`}})
    }
    const deactivateVolunteering = async () => {
        axios({method:'patch',url:`http://localhost:5012/v1/CharityEventVolunteering/${eventData.volunteeringId}?isActive=false`,headers:{Authorization: `Bearer ${token}`}})
    }
    return(
        <div>
        <div className={styles.fixfooter}>
            <NavBar/>
            {eventData.length !== 0 && <div>
                {(eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventVolunteering.isActive === 1 && eventData.charityEventFundraising.isActive === 1) ?
                <div className={styles.verification}>  
                        <Link to={`/editEvent/${eventData.idCharityEvent}`}><div className={styles.button}><Button onClick={''} variant="contained" style={{width:'280px',fontWeight:'bold',height:'50px'}}  color="warning" >Edytuj akcję</Button></div></Link>
                        <div className={styles.button}><Button onClick={deactivate} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="error" >Dezaktywuj całą akcję</Button></div>
                        <div className={styles.button}><Button onClick={deactivateF} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="error" >Dezaktywuj akcję pieniężną</Button></div>
                        <div className={styles.button}><Button onClick={deactivateV} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="error" >Dezaktywuj akcję wolontariacką</Button></div>
                </div>:
                (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventVolunteering.isActive === 0) ?
                <div className={styles.verification}>  
                        <Link to={`/editEvent/${eventData.idCharityEvent}`}><div className={styles.button}><Button onClick={''} variant="contained" style={{width:'280px',fontWeight:'bold',height:'50px'}}  color="warning" >Edytuj akcję</Button></div></Link>
                        <div className={styles.button}><Button onClick={deactivateF} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="error" >Dezaktywuj akcję pieniężną</Button></div>
                </div>:
                (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventFundraising.isActive === 0) ?
                <div className={styles.verification}>  
                        <Link to={`/editEvent/${eventData.idCharityEvent}`}><div className={styles.button}><Button onClick={''} variant="contained" style={{width:'280px',fontWeight:'bold',height:'50px'}}  color="warning" >Edytuj akcję</Button></div></Link>
                        <div className={styles.button}><Button onClick={deactivateV} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="error" >Dezaktywuj akcję wolontariacką</Button></div>
                </div>:
                (eventData.charityEventFundraising === null && eventData.charityEventVolunteering !== null) ?
                <div className={styles.verification}>    
                        <Link to={`/editEvent/${eventData.idCharityEvent}`}><div className={styles.button}><Button onClick={''} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="warning" >Edytuj akcję</Button></div></Link>
                        <div className={styles.button}><Button onClick={deactivateV} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="error" >Dezaktywuj akcję</Button></div>
                </div>:
                <div className={styles.verification}>
                        <Link to={`/editEvent/${eventData.idCharityEvent}`}><div className={styles.button}><Button onClick={''} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="warning" >Edytuj akcję</Button></div></Link>
                        <div className={styles.button}><Button onClick={deactivateF} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="error" >Dezaktywuj akcję</Button></div>
                </div>}
             <div className={styles.display}>
                <CloseIcon className={styles.close} onClick={goBack}/>
                <h1 className={styles.title}>{eventData.title}</h1>
                <h2 className={styles.description}>{eventData.description}</h2>
                <div>
                    {
                        (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering === null) ?
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundraising.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundraising.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundraising.amountOfMoneyToCollect}
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetDonationsById id={eventData.fundraisingId}/></div>
                            </div>:
                        (eventData.charityEventVolunteering !== null && eventData.charityEventFundraising === null) ?
                            <div>
                                <div className={styles.volunteers}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" potrzebnych wolontariuszy"}

                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div ><div style={{marginTop:'30px',textAlign:'center',marginBottom:'30px',marginRight:'65px'}}><LocationAdd Eventid={eventData.volunteeringId}/></div><div  style={{marginTop:'0px',textAlign:'center'}}><GetLocationsByIdVolunteering id={eventData.volunteeringId}/></div></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetVolunteersById id={eventData.volunteeringId} extended={true}/></div>
                            </div>:
                        (eventData.charityEventVolunteering !== null && eventData.charityEventFundraising !== null && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundraising.isActive === 1) ?
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundraising.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundraising.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundraising.amountOfMoneyToCollect}
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetDonationsById id={eventData.fundraisingId}/></div>
                            </div>:
                        (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventVolunteering.isActive === 1 && eventData.charityEventFundraising.isActive === 0 ) ?
                            <div>
                                <div className={styles.volunteers}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" potrzebnych wolontariuszy"}

                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div ><div style={{marginTop:'40px',textAlign:'center',marginBottom:'30px',marginRight:'65px'}}><LocationAdd Eventid={eventData.volunteeringId}/></div><div  style={{marginTop:'0px',textAlign:'center'}}><GetLocationsByIdVolunteering id={eventData.volunteeringId}/></div></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetVolunteersById id={eventData.volunteeringId} extended={true}/></div>
                            </div>:
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundraising.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundraising.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundraising.amountOfMoneyToCollect} zł
                                </div>
                                <div className={styles.volunteers}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" wolontariuszy"}
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div ><div style={{marginTop:'40px',textAlign:'center',marginBottom:'30px',marginRight:'65px'}}><LocationAdd Eventid={eventData.volunteeringId}/></div><div  style={{marginTop:'0px',textAlign:'center'}}><GetLocationsByIdVolunteering id={eventData.volunteeringId}/></div></div>
                                <div className={styles.stats}><div style={{marginBottom:'20px',marginTop:'20px'}}><GetDonationsById id={eventData.fundraisingId}/></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetVolunteersById id={eventData.volunteeringId} extended={true}/></div></div>
                            </div>
                    }
                </div>
             </div>
             </div>
            }
            
        </div>
        <Footer/>
        </div>
    );
}   

export default UserView