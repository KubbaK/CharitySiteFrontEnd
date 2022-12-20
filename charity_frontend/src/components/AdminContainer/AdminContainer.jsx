import React,{useEffect,useState} from "react";
import axios from "axios";
import styles from './AdminContainer.module.scss'
import { useCookies } from "react-cookie";
import { Skeleton } from "@mui/material";
import GetEventsPerAdminPage from "../GetEventsPerPage/GetEventsPerAdminPage";
import Pagination from "../Pagination/Pagination";


const AdminContainer = (props) => {
    const [loaded,setLoaded] = useState(true)
    const [allEvents, setAllEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(9);
    const [jwtcookie,,] = useCookies(["jwt"]);
    const [totalPages, setTotalPages] = useState(0);
    const [toogle,setToogle] = useState(false)
    const token = jwtcookie.jwt

    const fetchEvents = async (pageNumber) => {
      axios.get(`http://localhost:5012/v1/Search/pagination?sortBy=CreatedEventDate&sortDirection=DESC&pageNumber=${pageNumber}&pageSize=${eventsPerPage}&volunteeringOrFundraisingIsVerified=false`,{headers:{Authorization: `Bearer ${token}`}})
      .then(response => {
       setAllEvents(response.data.items)
       setTotalPages(response.data.totalPages)
       setLoaded(false)
    });
  }
    useEffect(() => {
     fetchEvents(1)
    },[]);

    useEffect(() => {
      fetchEvents(currentPage)
    },[toogle])

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
      setLoaded(true)
      setToogle(prevState => !prevState)
    }
    return(
        <div>
            {loaded ? <Skeleton variant="rectangular"  className={styles.skeleton} /> : 
            <div>
              {allEvents.length === 0 && <div className={styles.brak}>BRAK AKCJI!</div>}
              <GetEventsPerAdminPage atype='verification' allEvents={allEvents} loaded={loaded}/>
              <Pagination eventsPerPage={eventsPerPage} totalEvents={totalPages} paginate={paginate} />
            </div>
          }
        </div>
    )
}

export default AdminContainer

