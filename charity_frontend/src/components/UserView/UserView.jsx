import React,{useState,useEffect} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import styles from "./UserView.module.scss"
import { useParams } from "react-router-dom";
import EventCarousel from "../EventCarousel/EventCarousel";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

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
            {eventData.length !== 0 && <div>
                {(eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null) ?
                <div className={styles.verification}>  
                        <div className={styles.button}><Button onClick={''} variant="contained" style={{width:'280px',fontWeight:'bold',height:'50px'}}  color="success" >Edytuj akcję</Button></div>  
                        <div className={styles.button}><Button onClick={deactivate} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="success" >Dezaktywuj całą akcję</Button></div>
                        <div className={styles.button}><Button onClick={deactivateF} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="success" >Dezaktywuj akcję pieniężną</Button></div>
                        <div className={styles.button}><Button onClick={deactivateV} variant="contained" style={{width:'300px',fontWeight:'bold',height:'50px'}}  color="success" >Dezaktywuj akcję wolontariacką</Button></div>
                </div>:
                (eventData.charityEventFundraising === null && eventData.charityEventVolunteering !== null) ?
                <div className={styles.verification}>    
                        <div className={styles.button}><Button onClick={''} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Edytuj akcję</Button></div>
                        <div className={styles.button}><Button onClick={deactivateV} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Dezaktywuj akcję</Button></div>
                </div>:
                <div className={styles.verification}>
                        <div className={styles.button}><Button onClick={''} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Edytuj akcję</Button></div>
                        <div className={styles.button}><Button onClick={deactivateF} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Dezaktywuj akcję</Button></div>
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
                            </div>:
                        (eventData.charityEventVolunteering !== null && eventData.charityEventFundraising === null) ?
                            <div>
                                <div className={styles.money}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" potrzebnych wolontariuszy"}

                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                            </div>:
                        (eventData.charityEventVolunteering !== null && eventData.charityEventFundraising !== null && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundraising.isActive === 1) ?
                            <div>
                                <div className={styles.money}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" potrzebnych wolontariuszy"}

                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                            </div>:
                        (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventVolunteering.isActive === 1 && eventData.charityEventFundraising.isActive === 0 ) ?
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundraising.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundraising.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundraising.amountOfMoneyToCollect}
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                            </div>:
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundraising.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundraising.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundraising.amountOfMoneyToCollect} zł
                                </div>
                                <div className={styles.money}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" wolontariuszy"}
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                            </div>
                    }
                </div>
             </div>
             </div>
            }
        </div>
    );
}   

export default UserView