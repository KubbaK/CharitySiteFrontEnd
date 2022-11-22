import React from "react";
import EventBox from "../EventBox/EvenBox";
import EventBoxVolunteer from "../EventBoxVolunteer/EventBoxVolunteer";
import EventBoxBoth from "../EventBoxBoth/EventBoxBoth";
import styles from "./GetEventsPerPage.module.scss"



const GetEventsPerPage = ({allEvents}) => {
    return(
        <div className={styles.Box}>
          {
            allEvents.map((ev,index) => ( 
              (ev.charityEventVolunteering === null  && ev.charityEventFundrasing !== null) ?
              <EventBox key={index} title={ev.title} description={ev.description} 
                progress={(15/ev.charityEventFundrasing.amountOfMoneyToCollect)*100} />:
              (ev.charityEventVolunteering !== null  && ev.charityEventFundrasing === null  ) ?
              <EventBoxVolunteer key={index} title={ev.title} description={ev.description}  
                  volunteers={ev.charityEventVolunteering.amountOfNeededVolunteers}/>:
              <EventBoxBoth key={index} title={ev.title} description={ev.description} 
                  volunteers={ev.charityEventVolunteering.amountOfNeededVolunteers} 
                      progress={(15/ev.charityEventFundrasing.amountOfMoneyToCollect)*100}  k/>
            ))
          }
        </div>
    )
}

export default GetEventsPerPage