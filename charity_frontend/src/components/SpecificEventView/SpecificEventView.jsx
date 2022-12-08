import React,{useState,useEffect} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import styles from "./SpecificEventView.module.scss"
import { useParams } from "react-router-dom";
import EventCarousel from "../EventCarousel/EventCarousel";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import VolunteerDialog from "../ButtonPopUps/VolunteerDialog";
import DonationDialog from "../ButtonPopUps/DonationDialog";

const SpecificEventView = () => {
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
    console.log(eventData)
    return(
        <div>
            {eventData.length !== 0 && 
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
                                        <div className={styles.button}><DonationDialog props={eventData.charityEventFundrasing.id} /></div>
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                            </div>:
                        (eventData.charityEventVolunteering !== null && eventData.charityEventFundrasing === null) ?
                            <div>
                                <div className={styles.money}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {"potrzebnych wolontariuszy:"}
                                    <div className={styles.button}><VolunteerDialog props={eventData.charityEventVolunteering.id} /></div>
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                            </div>:
                        (eventData.charityEventVolunteering !== null && eventData.charityEventFundrasing !== null && eventData.charityEventVolunteering.isActive === 1 && eventData.charityEventFundrasing.isActive === 0) ?
                            <div>
                                <div className={styles.money}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {"potrzebnych wolontariuszy:"}
                                    <div className={styles.button}><VolunteerDialog props={eventData.charityEventVolunteering.id} /></div>
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                            </div>:
                        (eventData.charityEventFundrasing !== null && eventData.charityEventVolunteering !== null && eventData.charityEventVolunteering.isActive === 0 && eventData.charityEventFundrasing.isActive === 1 ) ?
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundrasing.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundrasing.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundrasing.amountOfMoneyToCollect}
                                        <div className={styles.button}><DonationDialog props={eventData.charityEventFundrasing.id} /></div>
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                            </div>:
                            <div>
                                <div className={styles.fundT}>Cel zbiórki: {eventData.charityEventFundrasing.fundTarget}</div>
                                <div className={styles.money}>{"Obecnie zebrano: "}
                                    {eventData.charityEventFundrasing.amountOfAlreadyCollectedMoney}/
                                        {eventData.charityEventFundrasing.amountOfMoneyToCollect} zł
                                        <div className={styles.button}><DonationDialog props={eventData.charityEventFundrasing.id} /></div>
                                </div>
                                <div className={styles.money}>{"Zgłosiło się "}
                                    {eventData.charityEventVolunteering.amountOfAttendedVolunteers}/
                                        {eventData.charityEventVolunteering.amountOfNeededVolunteers}
                                            {" wolontariuszy:"}
                                    <div className={styles.button}><VolunteerDialog props={eventData.charityEventVolunteering.id} /></div>
                                </div>
                                <div className={styles.photos}><EventCarousel photos={photos}/></div>
                            </div>
                    }    
                </div>
             </div>
            }
        </div>
    );
}   

export default SpecificEventView