import React,{useState,useEffect} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import styles from "./VerificationView.module.scss"
import { useParams } from "react-router-dom";
import EventCarousel from "../EventCarousel/EventCarousel";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const VerificationView = () => {
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
    const verify = async () => {
        await verifyAll().then(await sleep(900)).then(await verifyFundraising()).then(await sleep(700)).then(await verifyVolunteering()).then(navigate(-2).then(sleep(500)).then(navigate(0)))
    }
    const verifyF = async () => {
        await verifyAll().then(await sleep(900)).then(await verifyFundraising()).then(await sleep(700)).then(navigate(-2).then(sleep(500)).then(navigate(0)))
    }
    const verifyV = async () => {
        await verifyAll().then(await sleep(900)).then(await verifyVolunteering()).then(await sleep(700)).then(navigate(-2).then(sleep(500)).then(navigate(0)))
    }
    const verifyAll = async () => {
         axios({method:'patch',url:`http://localhost:5012/v1/CharityEvent/${eventData.idCharityEvent}?isVerified=true&isActive=true`,headers:{Authorization: `Bearer ${token}`}})
         
    }
    const verifyFundraising = async () => {
        axios({method:'patch',url:`http://localhost:5012/v1/CharityEventFundraising/${eventData.fundraisingId}?isVerified=true&isActive=true`,headers:{Authorization: `Bearer ${token}`}})
    }
    const verifyVolunteering = async () => {
        axios({method:'patch',url:`http://localhost:5012/v1/CharityEventVolunteering/${eventData.volunteeringId}?isVerified=true&isActive=true`,headers:{Authorization: `Bearer ${token}`}})
    }

    const denied = async () => {
        await deniedAll().then(await sleep(900)).then(await deniedFundraising()).then(await sleep(700)).then(await deniedVolunteering()).then(navigate(-2).then(sleep(500)).then(navigate(0)))
    }
    const deniedF = async () => {
        await deniedAll().then(await sleep(900)).then(await deniedFundraising()).then(await sleep(700)).then(navigate(-2).then(sleep(500)).then(navigate(0)))
    }
    const deniedV = async () => {
        await deniedAll().then(await sleep(900)).then(await deniedVolunteering()).then(await sleep(700)).then(navigate(-2).then(sleep(500)).then(navigate(0)))
    }
    const deniedAll = async () => {
         axios({method:'patch',url:`http://localhost:5012/v1/CharityEvent/${eventData.idCharityEvent}?isVerified=true&isDenied=true`,headers:{Authorization: `Bearer ${token}`}})
         
    }
    const deniedFundraising = async () => {
        axios({method:'patch',url:`http://localhost:5012/v1/CharityEventFundraising/${eventData.fundraisingId}?isVerified=true&isDenied=true`,headers:{Authorization: `Bearer ${token}`}})
    }
    const deniedVolunteering = async () => {
        axios({method:'patch',url:`http://localhost:5012/v1/CharityEventVolunteering/${eventData.volunteeringId}?isVerified=true&isDenied=true`,headers:{Authorization: `Bearer ${token}`}})
    }
    return(
        <div>
            {eventData.length !== 0 && <div>
                {(eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventFundraising.isActive === 0 && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundraising.isVerified === 0 && eventData.charityEventVolunteering.isVerified === 0) ?
                <div className={styles.verification} style={{height:'250px'}}>    
                        <div><div className={styles.button}><Button onClick={verify} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj całą akcję</Button></div>
                        <div className={styles.button}><Button onClick={verifyF} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj akcję pieniężną</Button></div>
                        <div className={styles.button}><Button onClick={verifyV} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj akcję wolontariacką</Button></div></div>
                        <div><div className={styles.button}><Button onClick={denied} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="error" >Odrzuć całą akcję</Button></div>
                        <div className={styles.button}><Button onClick={deniedF} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="error" >Odrzuć akcję pieniężną</Button></div>
                        <div className={styles.button}><Button onClick={deniedV} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="error" >Odrzuć akcję wolontariacką</Button></div></div>
                </div>:
                (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventFundraising.isActive === 0 && eventData.charityEventVolunteering.isActive === 1 ) ?
                <div className={styles.verification} style={{height:'150px'}}>    
                        <div className={styles.button}><Button onClick={verifyF} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj akcję pieniężną</Button></div>
                        <div className={styles.button}><Button onClick={deniedF} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="error" >Odrzuć akcję pieniężną</Button></div>
                </div>:
                (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventFundraising.isActive === 1 && eventData.charityEventVolunteering.isActive === 0 ) ?
                <div className={styles.verification} style={{height:'150px'}}>    
                        <div className={styles.button}><Button onClick={verifyV} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj akcję wolontariacką</Button></div>
                        <div className={styles.button}><Button onClick={deniedV} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="error" >Odrzuć akcję wolontariacką</Button></div>
                </div>:

                (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventFundraising.isActive === 0 && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundraising.isVerified === 0 && eventData.charityEventVolunteering.isVerified === 1 ) ?
                <div className={styles.verification} style={{height:'150px'}}>    
                        <div className={styles.button}><Button onClick={verifyF} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj akcję pieniężną</Button></div>
                        <div className={styles.button}><Button onClick={deniedF} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="error" >Odrzuć akcję pieniężną</Button></div>
                </div>:
                (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering !== null && eventData.charityEventFundraising.isActive === 0 && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundraising.isVerified === 1 && eventData.charityEventVolunteering.isVerified === 0 ) ?
                <div className={styles.verification} style={{height:'150px'}}>    
                        <div className={styles.button}><Button onClick={verifyV} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj akcję wolontariacką</Button></div>
                        <div className={styles.button}><Button onClick={deniedV} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="error" >Odrzuć akcję wolontariacką</Button></div>
                </div>:

                (eventData.charityEventFundraising === null && eventData.charityEventVolunteering !== null) ?
                <div className={styles.verification} style={{height:'150px'}}>    
                        <div className={styles.button}><Button onClick={verifyV} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj akcję</Button></div>
                        <div className={styles.button}><Button onClick={deniedV} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="error" >Odrzuć akcję </Button></div>
                </div>:
                (eventData.charityEventFundraising !== null && eventData.charityEventVolunteering === null) ?
                <div className={styles.verification} style={{height:'150px'}}>
                        <div className={styles.button}><Button onClick={verifyF} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj akcję</Button></div>
                        <div className={styles.button}><Button onClick={deniedF} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="error" >Odrzuć akcję pieniężną</Button></div>
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
                            </div>:
                        (eventData.charityEventVolunteering !== null && eventData.charityEventFundraising === null) ?
                            <div>
                                <div className={styles.money}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {"potrzebnych wolontariuszy"}

                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                            </div>:
                        (eventData.charityEventVolunteering !== null && eventData.charityEventFundraising !== null && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundraising.isActive === 1) ?
                            <div>
                                <div className={styles.money}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {"potrzebnych wolontariuszy"}

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

export default VerificationView