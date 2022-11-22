import React,{useState,useEffect} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import GetEventsPerPage from "../GetEventsPerPage/GetEventsPerPage";
import Pagination from "../Pagination/Pagination";

const GetEvents = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(9);
    const [jwtcookie,,] = useCookies(["jwt"]);
    const token = jwtcookie.jwt
    useEffect(() => {
        const fetchEvents = async () => {
            axios.get("http://localhost:5012/v1/Search",{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
             setAllEvents(response.data)
          });
        }
     fetchEvents()
    },[]);

    const paginate = pageNumber => setCurrentPage(pageNumber)
    const indexOfLastEvent = currentPage * eventsPerPage
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
    const currentEvents = allEvents.slice(indexOfFirstEvent,indexOfLastEvent)
    return(
        <div>
          <GetEventsPerPage allEvents={currentEvents}/>
          <Pagination eventsPerPage={eventsPerPage} totalEvents={allEvents.length} paginate={paginate} />
        </div>
    )
}

export default GetEvents