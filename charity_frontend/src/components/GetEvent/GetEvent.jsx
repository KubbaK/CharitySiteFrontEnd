import React,{useState,useEffect} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import EventBox from "../EventBox/EvenBox";
import EventBoxVolunteer from "../EventBoxVolunteer/EventBoxVolunteer";
import EventBoxBoth from "../EventBoxBoth/EventBoxBoth";
import styles from "./GetEvent.module.scss"



const GetEvent = () =>{
    const [allEvents, setAllEvents] = useState([]);
    const [jwtcookie,,] = useCookies(["jwt"]);
    const token = jwtcookie.jwt
    useEffect(() => {
      axios.get("http://localhost:5012/v1/Search",{headers:{Authorization: `Bearer ${token}`}})
      .then(response => {
       setAllEvents(response.data)
       console.log(allEvents)
    }
      );
    },[]);
    return(
        <div className={styles.Box}>
          {
            allEvents.map(ev => (
              (ev.charityEventVolunteering === null  && ev.charityEventFundrasing !== null  ) ?
              <EventBox title={ev.title} description={ev.description} 
                progress={(15/ev.charityEventFundrasing.amountOfMoneyToCollect)*100} />:
              (ev.charityEventVolunteering !== null  && ev.charityEventFundrasing === null  ) ?
              <EventBoxVolunteer title={ev.title} description={ev.description}  
                  volunteers={ev.charityEventVolunteering.amountOfNeededVolunteers}  />:
              <EventBoxBoth title={ev.title} description={ev.description} 
                  volunteers={ev.charityEventVolunteering.amountOfNeededVolunteers} 
                      progress={(15/ev.charityEventFundrasing.amountOfMoneyToCollect)*100}  />
            ))
          }
        </div>
    )
}

export default GetEvent