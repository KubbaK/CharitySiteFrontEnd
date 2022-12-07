import React,{useEffect,useState} from "react";
import axios from "axios";
import styles from './AdminContainer.module.scss'
import {useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";
import { Skeleton } from "@mui/material";
import GetEventsPerPage from "../GetEventsPerPage/GetEventsPerPage";
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
    const navigate = useNavigate();
    const goBack = () =>{
      navigate(-1)
    }
    const fetchEvents = async (pageNumber) => {
      axios.get(`http://localhost:5012/v1/Search/pagination?isVerified=false&sortBy=CreatedEventDate&sortDirection=DESC&pageNumber=${pageNumber}&pageSize=${eventsPerPage}`,{headers:{Authorization: `Bearer ${token}`}})
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
              <GetEventsPerPage atype='verification' allEvents={allEvents} loaded={loaded}/>
              <Pagination eventsPerPage={eventsPerPage} totalEvents={totalPages} paginate={paginate} />
            </div>
          }
        </div>
    )
}

export default AdminContainer

