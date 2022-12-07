import React,{useEffect,useState} from "react";
import axios from "axios";
import styles from './EventContainer.module.scss'
import {useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";
import { Skeleton } from "@mui/material";
import GetEventsPerPage from "../GetEventsPerPage/GetEventsPerPage";


const EventContainer= () => {
    const navigate = useNavigate()
    const [loaded,setLoaded] = useState(true)
    const [allEvents, setAllEvents] = useState([]);
    const [jwtcookie,,] = useCookies(["jwt"]);
    const token = jwtcookie.jwt
    useEffect(() => {
        const fetchEvents = async () => {
            axios.get("http://localhost:5012/v1/Search/mostPopularFundraisings?numberOfEvents=3",{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
             setAllEvents(response.data)
             setLoaded(false)
          });
        }
     fetchEvents()
    },[]);
        return(
            <div>
            {
            (!allEvents.charityEventVolunteering) &&
                <div className={styles.Box}>
                {loaded ? <Skeleton variant="rectangular"  className={styles.skeleton} /> : 
                <div>
                {allEvents.length === 0 && <div className={styles.brak}>BRAK</div>}
                    <GetEventsPerPage allEvents={allEvents} atype='normal' loaded={loaded}/>
                </div>
                }   
                </div>
            }
            </div>
        );
}


export default EventContainer

