import React,{useState,useEffect} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import GetEventsPerPage from "../GetEventsPerPage/GetEventsPerPage";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Pagination from "../Pagination/Pagination";
import styles from "./GetEvents.module.scss";
import {useNavigate} from 'react-router-dom';

const GetEventsVolunteering = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(9);
    const [jwtcookie,,] = useCookies(["jwt"]);
    const token = jwtcookie.jwt
    const navigate = useNavigate();
    const goBack = () =>{
      navigate(-1)
    }
    useEffect(() => {
        const fetchEvents = async () => {
            axios.get("http://localhost:5012/v1/Search?isVolunteering=true",{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
             setAllEvents(response.data)
             console.log(response)
          });
        }
     fetchEvents()
    },[]);

    const paginate = pageNumber => setCurrentPage(pageNumber)
    const indexOfLastEvent = currentPage * eventsPerPage
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
    const currentEvents = allEvents.slice(indexOfFirstEvent,indexOfLastEvent)
    console.log(allEvents)
    return(
        <div>
          <KeyboardBackspaceIcon className={styles.back} onClick={goBack}/>
          {allEvents.length === 0 && <div>BRAK</div>}
          <GetEventsPerPage allEvents={currentEvents}/>
          <Pagination eventsPerPage={eventsPerPage} totalEvents={allEvents.length} paginate={paginate} />
        </div>
    )
}

export default GetEventsVolunteering