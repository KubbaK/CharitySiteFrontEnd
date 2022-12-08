import React,{useState,useEffect} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import styles from "./VerificationView.module.scss"
import { useParams } from "react-router-dom";
import EventCarousel from "../EventCarousel/EventCarousel";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import DonationDialog from "../ButtonPopUps/DonationDialog";
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
        await verifyAll().then(await sleep(700)).then(await verifyFundraising()).then(await sleep(500)).then(await verifyVolunteering()).then(navigate(-2))
    }
    const verifyF = async () => {
        await verifyAll().then(await sleep(700)).then(await verifyFundraising()).then(await sleep(500).then(navigate(-2)))
    }
    const verifyV = async () => {
        await verifyAll().then(await sleep(700)).then(await verifyVolunteering()).then(await sleep(500).then(navigate(-2)))
    }
    const verifyAll = async () => {
         axios.patch(`http://localhost:5012/v1/CharityEvent/${eventData.idCharityEvent}?isVerified=true&isActive=true`,{headers:{Authorization: `Bearer ${token}`}})
    }
    const verifyFundraising = async () => {
        axios.patch(`http://localhost:5012/v1/CharityEventFundraising/${eventData.fundraisingId}?isVerified=true&isActive=true`,{headers:{Authorization: `Bearer ${token}`}})
    }
    const verifyVolunteering = async () => {
        axios.patch(`http://localhost:5012/v1/CharityEventVolunteering/${eventData.volunteeringId}?isVerified=true&isActive=true`,{headers:{Authorization: `Bearer ${token}`}})
    }
    return(
        <div>
            {eventData.length !== 0 && <div>
                {(eventData.charityEventFundrasing !== null && eventData.charityEventVolunteering !== null) ?
                <div class={styles.verification}>    
                        <div className={styles.button}><Button onClick={verify} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj całą akcję</Button></div>
                        <div className={styles.button}><Button onClick={verifyF} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj akcję pieniężną</Button></div>
                        <div className={styles.button}><Button onClick={verifyV} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj akcję wolontariacką</Button></div>
                </div>:
                (eventData.charityEventFundrasing === null && eventData.charityEventVolunteering !== null) ?
                <div class={styles.verification}>    
                        <div className={styles.button}><Button onClick={verifyV} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj akcję</Button></div>
                </div>:
                <div class={styles.verification}>
                        <div className={styles.button}><Button onClick={verifyF} variant="contained" style={{width:'320px',fontWeight:'bold',height:'50px'}}  color="success" >Zaakceptuj akcję</Button></div>
                </div>}
             <div className={styles.display}>
                <CloseIcon className={styles.close} onClick={goBack}/>
                <h1 className={styles.title}>{eventData.title}</h1>
                <h2 className={styles.description}>{eventData.description}</h2>
                <div>
                    {
                        (eventData.charityEventFundrasing !== null && eventData.charityEventVolunteering === null) ?
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundrasing.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundrasing.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundrasing.amountOfMoneyToCollect}
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                            </div>:
                        (eventData.charityEventVolunteering !== null && eventData.charityEventFundrasing === null) ?
                            <div>
                                <div className={styles.money}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {"potrzebnych wolontariuszy:"}

                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                            </div>:
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundrasing.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundrasing.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundrasing.amountOfMoneyToCollect} zł
                                </div>
                                <div className={styles.money}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" wolontariuszy:"}
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