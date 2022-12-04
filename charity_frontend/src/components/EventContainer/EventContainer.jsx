import React,{useEffect,useState} from "react";
import axios from "axios";
import styles from './EventContainer.module.scss'
import Box from '@mui/system/Box';
import PhotoContainer from "../PhotoContainer/PhotoContainer";
import {useNavigate} from 'react-router-dom';
import Image1 from '../images/jest.png'
import ProgressBar from "../ProgressBar/ProgressBar";
import { useCookies } from "react-cookie";
import { Skeleton } from "@mui/material";
import GetEventsPerPage from "../GetEventsPerPage/GetEventsPerPage";
import Pagination from "../Pagination/Pagination";

const EventContainer= (props) => {
    const navigate = useNavigate()
    const [loaded,setLoaded] = useState(true)
    const [allEvents, setAllEvents] = useState([]);
    const [jwtcookie,,] = useCookies(["jwt"]);
    const token = jwtcookie.jwt
    const handleClick = () => {
        navigate("/login")
    }
    useEffect(() => {
        const fetchEvents = async () => {
            axios.get("http://localhost:5012/v1/Search/pagination?pageNumber=1&pageSize=6",{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
             setAllEvents(response.data.items)
             setLoaded(false)
          });
        }
     fetchEvents()
    },[]);
        return(
            <div className={styles.Box}>
            {loaded ? <Skeleton variant="rectangular"  className={styles.skeleton} /> : 
            <div>
              {allEvents.length === 0 && <div className={styles.brak}>BRAK</div>}
                <GetEventsPerPage allEvents={allEvents} loaded={loaded}/>
            </div>
            }   
            </div>
        );
}


export default EventContainer

