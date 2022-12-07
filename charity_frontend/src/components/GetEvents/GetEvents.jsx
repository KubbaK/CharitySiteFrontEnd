import React,{useState,useEffect} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import GetEventsPerPage from "../GetEventsPerPage/GetEventsPerPage";
import Pagination from "../Pagination/Pagination";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import styles from "./GetEvents.module.scss";
import {useNavigate} from 'react-router-dom';
import { Skeleton} from "@mui/material";
import Navbar from "../NavigationBar/NavBar.jsx"
import Footer from "../Footer/Footer.jsx"

const GetEvents = () => {
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
      axios.get(`http://localhost:5012/v1/Search/pagination?isVerified=true&sortBy=CreatedEventDate&sortDirection=DESC&pageNumber=${pageNumber}&pageSize=${eventsPerPage}`,{headers:{Authorization: `Bearer ${token}`}})
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
            <div style={{marginBottom:'70px'}}><Navbar/></div>
            <KeyboardBackspaceIcon className={styles.back} onClick={goBack}/>
            {loaded ? <Skeleton variant="rectangular"  className={styles.skeleton} /> : 
            <div>
              {allEvents.length === 0 && <div className={styles.brak}>BRAK AKCJI!</div>}
              <GetEventsPerPage allEvents={allEvents} atype='normal' loaded={loaded}/>
              <Pagination eventsPerPage={eventsPerPage} totalEvents={totalPages} paginate={paginate} />
            </div>
          }
        </div>
    )
}

export default GetEvents