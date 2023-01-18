import React, {useState, useEffect} from 'react';
import EventFormDonation from '../EventForm/EventFormDonation';
import styles from './FormComponent.module.scss'
import NavBar from "../NavigationBar/NavBar.jsx"
import EventFormVolunteering from '../EventForm/EventFormVolunteering';
import EventFormBoth from '../EventForm/EventFormBoth';
import {useCookies} from "react-cookie"


const FormComponent = () =>{
    const [jwtcookie,,] = useCookies(["jwt"]);

    
    const [actionType,setActionType] = useState("donate");
    const [donateIsVisible,setDonate] = useState(false);
    const [volunteeringIsVisible,setVolunteering] = useState(false);
    const [bothIsVisible,setBoth] = useState(false);
    
    useEffect(() => {
        actionType === "donate"
        ? setDonate(true)
        : setDonate(false);
        actionType === "volunteering"
        ? setVolunteering(true)
        : setVolunteering(false);
        actionType === "both"
        ? setBoth(true)
        : setBoth(false);
     } ,[actionType]);

    function handleOnChange(event) {
            setActionType(event.target.value);
        }  
    return(
        <div >
            {jwtcookie.jwt !== undefined &&
            <div >
            <NavBar />
            <div className={styles.page_title}>
                <h1>Utwórz swoją akcję charytatywną</h1>
            </div>
            <div className={styles.selection}>
                <div className={styles.selectLabel}>
                    <label>Jaką akcję chcesz stworzyć?</label>
                </div>
                <select className={styles.select} value={actionType} 
                    onChange={handleOnChange}>
                    <option value="donate">Akcja pieniężna</option>
                    <option value="volunteering">Akcja wolontariacka</option>
                    <option value="both">Akcja mieszana</option>
                </select>
            </div>
            {donateIsVisible  && <EventFormDonation/>}
            {volunteeringIsVisible && <EventFormVolunteering/>}
            {bothIsVisible && <EventFormBoth/>}
            </div>
           
            }
            {jwtcookie.jwt === undefined &&
                <div className={styles.brak}>BRAK DOSTĘPU</div>
            }
        </div>
    );
}

export default FormComponent