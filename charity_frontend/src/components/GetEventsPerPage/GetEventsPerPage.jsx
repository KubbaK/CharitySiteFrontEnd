import React from "react";
import EventBox from "../EventBox/EvenBox";
import EventBoxVolunteer from "../EventBoxVolunteer/EventBoxVolunteer";
import EventBoxBoth from "../EventBoxBoth/EventBoxBoth";
import styles from "./GetEventsPerPage.module.scss"



const GetEventsPerPage = ({allEvents}) => {
    const base64toImage = (type,imageString) =>{
      var image = new Image();
      if (type === "image/png"){
          image = `data:image/png;base64,${imageString}`
      }
      if (type === "image/jpeg"){
        image = `data:image/jpg;base64,${imageString}`
    }
      return image
    }
    return(
      <div>
        <div className={styles.Box}>
          {
            allEvents.map((ev,index) => ( 
              (ev.charityEventVolunteering === null  && ev.charityEventFundrasing !== null) ?
              <EventBox key={index} image={base64toImage(ev.imageDto.contentType,ev.imageDto.content)} title={ev.title} description={ev.description} 
                progress={(15/ev.charityEventFundrasing.amountOfMoneyToCollect)*100}
                  charityId={ev.idCharityEvent} />:
              (ev.charityEventVolunteering !== null  && ev.charityEventFundrasing === null  ) ?
              <EventBoxVolunteer key={index} image={base64toImage(ev.imageDto.contentType,ev.imageDto.content)} title={ev.title} description={ev.description}  
                  volunteers={ev.charityEventVolunteering.amountOfNeededVolunteers}
                  charityId={ev.idCharityEvent} />:
              <EventBoxBoth key={index} image={base64toImage(ev.imageDto.contentType,ev.imageDto.content)} title={ev.title} description={ev.description} 
                  volunteers={ev.charityEventVolunteering.amountOfNeededVolunteers} 
                      progress={(15/ev.charityEventFundrasing.amountOfMoneyToCollect)*100}
                      charityId={ev.idCharityEvent} />
            ))
          }
        </div>
      </div>
    )
}

export default GetEventsPerPage