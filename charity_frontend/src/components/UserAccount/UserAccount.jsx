import {React} from 'react'
import axios from 'axios'
import Footer from '../Footer/Footer'
import NavBar from '../NavigationBar/NavBar'
import styles from './UserAccount.module.scss'
import { useState, useEffect } from 'react'
import {useCookies} from "react-cookie";
import jwtDecode from 'jwt-decode'
import PersonalDataAdd from '../ButtonPopUps/PersonalDataAdd'
import PersonalDataEdit from '../ButtonPopUps/PersonalDataEdit'
import { Skeleton } from "@mui/material";
import GetEventsPerPage from "../GetEventsPerPage/GetEventsPerPage";
import GetDesactivatedEventsPerPage from '../GetEventsPerPage/GetDesactivatedEventsPerPage'
import Pagination from "../Pagination/Pagination";


const UserAccount = () => {
    const [jwtcookie,,] = useCookies(["jwt"]);
    const token = jwtcookie.jwt
    const decoded = jwtDecode(token)
    const id = decoded.Id
    const [dataExist,setDataExist] = useState(false)
    const [userData,setUserData] = useState("")
    const [userStatistic,setUserStatistic] = useState("")
    const [volunteerEvents,setVolunteerEvents] = useState("")
    const [deniedEvents,setDeniedEvents] = useState("")
    const [deactivatedEvents,setDeactivatedEvents] = useState("")
    const [currentContainer,setCurrentContainer] = useState(1)

    const [loaded,setLoaded] = useState(true)
    const [allEvents, setAllEvents] = useState([]);
    const [eventsPerPage] = useState(9);
    const fetchEvents = async () => {
        axios.get(`http://localhost:5012/v1/UserStatistics/charityEvents/${id}?volunteeringOrFundraisingIsActive=true&volunteeringOrFundraisingIsDenied=false`,{headers:{Authorization: `Bearer ${token}`}})
        .then(response => {
         setAllEvents(response.data)
         setLoaded(false)
      });
    }
    const fetchVolunteerEvents = async () => {
        axios.get("http://localhost:5012/v1/UserStatistics/charityEventsWithVolunteering/"+id,{headers:{Authorization: `Bearer ${token}`}})
        .then(response => {
            console.log(response.data)
         setVolunteerEvents(response.data)
      });
    }
    const fetchDeniedEvents = async () => {
        axios.get(`http://localhost:5012/v1/UserStatistics/charityEvents/${id}?volunteeringOrFundraisingIsDenied=true`,{headers:{Authorization: `Bearer ${token}`}})
        .then(response => {   
        console.log(response.data)
         setDeniedEvents(response.data)
      });
    }
    const fetchDesactivatedEvents = async () => {
        axios.get(`http://localhost:5012/v1/UserStatistics/charityEvents/${id}?volunteeringOrFundraisingIsVerified=true&volunteeringOrFundraisingIsActive=false`,{headers:{Authorization: `Bearer ${token}`}})
        .then(response => {   
        console.log(response.data)
         setDeactivatedEvents(response.data)
      });
    }

    useEffect(() => {
        const fetchUserData = () => {
             axios.get("http://localhost:5012/v1/PersonalData/"+id,{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
             setUserData(response.data)
          });
        }
        const fetchUserStatistics = () => {
            axios.get("http://localhost:5012/v1/UserStatistics/"+id,{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
             setUserStatistic(response.data)
          });
        }
        const checkUserData = () => {
            axios.get("http://localhost:5012/v1/PersonalData/exists/"+id,{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
             setDataExist(response.data)
             if (response.data === true){
                fetchUserData()
            }
          });
        }
        
        checkUserData()
        fetchUserStatistics()
        fetchEvents(1)
        fetchVolunteerEvents()
        fetchDeniedEvents()
        fetchDesactivatedEvents()
    },[]);
      const paginate = (pageNumber) => {
        setLoaded(true)
      }
    return(
        <div>
        <div className={styles.page}>
            <div className={styles.page1}>
            <NavBar/>
            <div className={styles.userStatistic}>
                <div>
                    <div style={{fontSize:'30px',marginBottom:'10px'}}>Moje statystyki:</div>
                    <div>Liczba dokonanych donacji:</div>
                    <div style={{color:'rgb(73, 72, 72)'}}>Kwota, którą wspomożono potrzebujących: </div>
                    <div>Ilość akcji, do których dołączono jako wolontariusz: </div>
                    <div style={{color:'rgb(73, 72, 72)'}}>Ilość założonych akcji wolontariackich: </div>
                    <div>Ilość założonych akcji pieniężnych: </div>
                </div>
                <div style={{float:'right',marginTop:'-166px',marginRight:'20px',color:'green'}}>
                    <div>{userStatistic.numberDonations}</div>
                    <div>{userStatistic.totalValueDonations}</div>
                    <div>{userStatistic.numberActionsAsVolunteer}</div>
                    <div>{userStatistic.numberVolunteeringsAsOrganizer}</div>
                    <div>{userStatistic.numberFundrasingsAsOrganizer}</div>
                </div>
            </div>
            <div className={styles.userData}>
                    <div style={{fontWeight:'bold',fontSize:'25px',marginBottom:'10px'}}>Moje dane:</div>
                    {dataExist === false &&
                    <div>
                        <div className={styles.lastline}>NIE PODAŁEŚ ŻADNYCH DANYCH</div>
                        <PersonalDataAdd/>
                    </div>
                    }
                    {dataExist === true &&
                    <div>
                        <div><div className={styles.line}>Imię i Nazwisko:</div> {userData.name} {userData.surname}</div>
                        <div><div className={styles.line}>Email:</div> {userData.email}</div>
                        <div><div className={styles.line}>Numer Telefonu:</div> {userData.phoneNumber}</div>
                        <div><div className={styles.line}>Adres:</div> {userData.town} {userData.street} {userData.houseNumber}/{userData.flatNumber}</div>
                        <div><div className={styles.lastline}>Kod pocztowy:</div> {userData.postalCode}</div>
                        <PersonalDataEdit/>
                    </div>
                    }
            </div>    
            </div>
            <div>
                <div className={styles.radio}>
                    <div>
                        <input type="radio" value={1} name="option" defaultChecked  onClick={() => setCurrentContainer(1)}/>
                    <span>Pokaż aktywne akcje</span></div>
                    <div>
                        <input type="radio" value={2} name="option" onClick={() => setCurrentContainer(2)}/> 
                    <span>Pokaż zdezaktywowane akcje</span></div>
                    <div>
                        <input type="radio" value={3} name="option" onClick={() => setCurrentContainer(3)} />
                    <span>Pokaż akcje odrzucone przez administatora</span></div>
                    <div>
                        <input type="radio" value={4} name="option" onClick={() => setCurrentContainer(4)} /> 
                    <span>Pokaż akcje, w których jestem wolontariuszem</span></div>
                </div>
                {currentContainer === 1 &&
                <div>
                    <div className={styles.active}>TWOJE AKTYWNE AKCJE:</div>
                    {loaded ? <Skeleton variant="rectangular"  className={styles.skeleton} /> : 
                    <div>
                        {allEvents.length === 0 && <div className={styles.brak}>BRAK AKCJI!</div>}
                        <GetEventsPerPage atype='userNormal' allEvents={allEvents} loaded={loaded}/>
                        <Pagination eventsPerPage={eventsPerPage} paginate={paginate} />
                    </div>
                    }
                </div>}
                {currentContainer === 2 &&
                <div>
                    <div>
                        {deactivatedEvents.length === 0 && <div className={styles.brak}>BRAK AKCJI!</div>}
                        {deactivatedEvents.length !== 0 && <GetDesactivatedEventsPerPage atype='userDeactivated' allEvents={deactivatedEvents}/>}
                    </div>
                </div>}
                {currentContainer === 3 &&
                <div>
                    <div>
                        {deniedEvents.length === 0 && <div className={styles.brak}>BRAK AKCJI!</div>}
                        {deniedEvents.length !== 0 && <GetEventsPerPage atype='normal' allEvents={deniedEvents}/>}
                    </div>
                </div>}
                {currentContainer === 4 &&
                <div>
                    <div>
                        {volunteerEvents.length === 0 && <div className={styles.brak}>BRAK AKCJI!</div>}
                        {volunteerEvents.length !== 0 && <GetEventsPerPage atype='normal' allEvents={volunteerEvents}/>}
                    </div>
                </div>}
            </div>
        </div>
        <Footer/></div>
    )
}

export default UserAccount