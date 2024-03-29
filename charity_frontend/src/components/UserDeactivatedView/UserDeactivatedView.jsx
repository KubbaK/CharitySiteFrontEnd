// MIT License
// Copyright (c) 2014 Call-Em-All, https://v4.mui.com/

import React,{useState,useEffect} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import styles from "./UserDeactivatedView.module.scss"
import { Link, useParams } from "react-router-dom";
import EventCarousel from "../EventCarousel/EventCarousel";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Footer from "../Footer/Footer.jsx";
import NavBar from "../NavigationBar/NavBar";
import GetDonationsById from "../GetDonationsById/GetDonationsById";
import GetVolunteersById from "../GetVolunteersById/GetVolunteersById";
import GetLocationsByIdVolunteering from "../GetLocationsByIdVolunteering/GetLocationsByIdVolunteering";


const UserDeactivatedView = () => {
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
    const activate = async () => {
        await activateAll().then(await sleep(700)).then(await activateFundraising()).then(await sleep(500)).then(await activateVolunteering()).then(navigate(-2).then(sleep(300)).then(navigate(0)))
    }
    const activateF = async () => {
        await activateAll().then(await sleep(700)).then(await activateFundraising()).then(await sleep(500)).then(navigate(-2).then(sleep(300)).then(navigate(0)))
    }
    const activateV = async () => {
        await activateAll().then(await sleep(700)).then(await activateVolunteering()).then(await sleep(500)).then(navigate(-2).then(sleep(300)).then(navigate(0)))
    }
    const activateAll = async () => {
         axios({method:'patch',url:`http://localhost:5012/v1/CharityEvent/${eventData.idCharityEvent}?isActive=true`,headers:{Authorization: `Bearer ${token}`}})
         
    }
    const activateFundraising = async () => {
        axios({method:'patch',url:`http://localhost:5012/v1/CharityEventFundraising/${eventData.idCharityFundraising}?isActive=true`,headers:{Authorization: `Bearer ${token}`}})
    }
    const activateVolunteering = async () => {
        axios({method:'patch',url:`http://localhost:5012/v1/CharityEventVolunteering/${eventData.idCharityVolunteering}?isActive=true`,headers:{Authorization: `Bearer ${token}`}})
    }
    return(
        <div>
            <div className={styles.fixfooter}>
                <NavBar/>
            {eventData.length !== 0 && <div>
                {(eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundraising.isActive === 0 && eventData.charityEventFundraising.isVerified === 1 && eventData.charityEventVolunteering.isVerified === 1 ) ?
                <div className={styles.verification}>  
                        <Link to={`/editEvent/${eventData.idCharityEvent}`}><div className={styles.button}><Button onClick={''} variant="contained" style={{width:'280px',fontWeight:'bold',height:'50px'}}  color="warning" >Edytuj akcję</Button></div></Link>
                        <div className={styles.button}><Button onClick={activate} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="success" >Aktywuj całą akcję</Button></div>
                        <div className={styles.button}><Button onClick={activateF} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="success" >Aktywuj akcję pieniężną</Button></div>
                        <div className={styles.button}><Button onClick={activateV} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="success" >Aktywuj akcję wolontariacką</Button></div>
                </div>:
                (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventVolunteering.isActive === 1 && eventData.charityEventFundraising.isActive === 0 ) ?
                <div className={styles.verification}>  
                        <Link to={`/editEvent/${eventData.idCharityEvent}`}><div className={styles.button}><Button onClick={''} variant="contained" style={{width:'280px',fontWeight:'bold',height:'50px'}}  color="warning" >Edytuj akcję</Button></div></Link>
                        <div className={styles.button}><Button onClick={activateF} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="success" >Aktywuj akcję pieniężną</Button></div>
                </div>:
                (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundraising.isActive === 1 ) ?
                <div className={styles.verification}>  
                        <Link to={`/editEvent/${eventData.idCharityEvent}`}><div className={styles.button}><Button onClick={''} variant="contained" style={{width:'280px',fontWeight:'bold',height:'50px'}}  color="warning" >Edytuj akcję</Button></div></Link>
                        <div className={styles.button}><Button onClick={activateV} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="success" >Aktywuj akcję wolontariacką</Button></div>
                </div>:

                (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundraising.isActive === 0 && eventData.charityEventFundraising.isVerified === 1 && eventData.charityEventVolunteering.isVerified === 0) ?
                <div className={styles.verification}>  
                        <Link to={`/editEvent/${eventData.idCharityEvent}`}><div className={styles.button}><Button onClick={''} variant="contained" style={{width:'280px',fontWeight:'bold',height:'50px'}}  color="warning" >Edytuj akcję</Button></div></Link>
                        <div className={styles.button}><Button onClick={activateF} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="success" >Aktywuj akcję pieniężną</Button></div>
                </div>:
                (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundraising.isActive === 1 && eventData.charityEventFundraising.isVerified === 0 && eventData.charityEventVolunteering.isVerified === 1) ?
                <div className={styles.verification}>  
                        <Link to={`/editEvent/${eventData.idCharityEvent}`}><div className={styles.button}><Button onClick={''} variant="contained" style={{width:'280px',fontWeight:'bold',height:'50px'}}  color="warning" >Edytuj akcję</Button></div></Link>
                        <div className={styles.button}><Button onClick={activateV} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="success" >Aktywuj akcję wolontariacką</Button></div>
                </div>:
                (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundraising.isActive === 0 && eventData.charityEventFundraising.isVerified === 1 && eventData.charityEventVolunteering.isVerified === 1) ?
                <div className={styles.verification}>  
                        <Link to={`/editEvent/${eventData.idCharityEvent}`}><div className={styles.button}><Button onClick={''} variant="contained" style={{width:'280px',fontWeight:'bold',height:'50px'}}  color="warning" >Edytuj akcję</Button></div></Link>
                        <div className={styles.button}><Button onClick={activate} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="success" >Aktywuj całą akcję</Button></div>
                        <div className={styles.button}><Button onClick={activateF} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="success" >Aktywuj akcję pieniężną</Button></div>
                        <div className={styles.button}><Button onClick={activateV} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="success" >Aktywuj akcję wolontariacką</Button></div>
                </div>:

                (eventData.charityEventFundraising === null && eventData.charityEventVolunteering !== null) ?
                <div className={styles.verification}>    
                        <Link to={`/editEvent/${eventData.idCharityEvent}`}><div className={styles.button}><Button onClick={''} variant="contained" style={{width:'280px',fontWeight:'bold',height:'50px'}}  color="warning" >Edytuj akcję</Button></div></Link>
                        <div className={styles.button}><Button onClick={activateV} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Aktywuj akcję</Button></div>
                </div>:
                (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering === null) ?
                <div className={styles.verification}>
                        <Link to={`/editEvent/${eventData.idCharityEvent}`}><div className={styles.button}><Button onClick={''} variant="contained" style={{width:'280px',fontWeight:'bold',height:'50px'}}  color="warning" >Edytuj akcję</Button></div></Link>
                        <div className={styles.button}><Button onClick={activateF} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Aktywuj akcję</Button></div>
                </div>:
                void(0)}
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
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetDonationsById id={eventData.idCharityFundraising}/></div>
                            </div>:
                        (eventData.charityEventVolunteering !== null && eventData.charityEventFundraising === null) ?
                            <div>
                                <div className={styles.volunteer}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" potrzebnych wolontariuszy"}

                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div className={styles.stats1} style={{justifyContent:'center'}}><div  style={{marginTop:'0px'}}><GetLocationsByIdVolunteering id={eventData.idCharityVolunteering}/></div></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetVolunteersById id={eventData.idCharityVolunteering}/></div>

                            </div>:
                        (eventData.charityEventVolunteering !== null && eventData.charityEventFundraising !== null && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundraising.isActive === 1) ?
                            <div>
                                <div className={styles.volunteer}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" potrzebnych wolontariuszy"}

                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div className={styles.stats1} style={{justifyContent:'center'}}><div  style={{marginTop:'0px'}}><GetLocationsByIdVolunteering id={eventData.idCharityVolunteering}/></div></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetVolunteersById id={eventData.idCharityVolunteering}/></div>

                            </div>:
                        (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventVolunteering.isActive === 1 && eventData.charityEventFundraising.isActive === 0 ) ?
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundraising.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundraising.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundraising.amountOfMoneyToCollect}
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetDonationsById id={eventData.idCharityFundraising}/></div>

                            </div>:
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundraising.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundraising.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundraising.amountOfMoneyToCollect} zł
                                </div>
                                <div className={styles.volunteer}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" wolontariuszy"}
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                                <div className={styles.stats}><div style={{marginTop:'0px',marginBottom:'30px',marginTop:'20px'}}><GetLocationsByIdVolunteering id={eventData.idCharityVolunteering}/></div></div>
                                <div className={styles.stats}><div style={{marginBottom:'20px',marginTop:'20px'}}><GetDonationsById id={eventData.idCharityFundraising}/></div>
                                <div style={{marginBottom:'20px',marginTop:'20px'}}><GetVolunteersById id={eventData.idCharityVolunteering}/></div></div>
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

export default UserDeactivatedView