import React, {useState, useEffect} from 'react';
import EventFormDonation from '../EventForm/EventFormDonation';
import styles from './FormComponent.module.scss'
import NavBar from "../NavigationBar/NavBar.jsx"
import EventFormVolunteering from '../EventForm/EventFormVolunteering';
import EventFormBoth from '../EventForm/EventFormBoth';
import {useCookies} from "react-cookie"


const FormComponent = () =>{
    const [rodzaj,setRodzaj] = useState("donate");
    
    const [donateVisible,setDonate] = useState(false);
    const [volunteeringVisible,setVolunteering] = useState(false);
    const [bothVisible,setBoth] = useState(false);

    const [jwtcookie,,] = useCookies(["jwt"]);
    useEffect(() => {
        rodzaj === "donate"
        ? setDonate(true)
        : setDonate(false);
        rodzaj === "volunteering"
        ? setVolunteering(true)
        : setVolunteering(false);
        rodzaj === "both"
        ? setBoth(true)
        : setBoth(false);
     } ,[rodzaj]);

    function handleOnChange(event) {
            setRodzaj(event.target.value);
        }  
    return(
        <div>
            {jwtcookie.jwt !== undefined &&
            <div>
            <NavBar />
            <div className={styles.page_title}>
                <h1>Utwórz swoją akcję charytatywną</h1>
            </div>
            <div className={styles.selection}>
            <div className={styles.selectLabel}><label>Jaką akcję chcesz stworzyć?</label></div>
                <select className={styles.select} value={rodzaj} onChange={handleOnChange}>
                    <option value="donate">Akcja pieniężna</option>
                    <option value="volunteering">Akcja wolontariacka</option>
                    <option value="both">Akcja mieszana</option>
                </select>
            </div>
            {donateVisible  && <EventFormDonation/>}
            {volunteeringVisible && <EventFormVolunteering/>}
            {bothVisible && <EventFormBoth/>}
            </div>
            }
            {jwtcookie.jwt === undefined &&
                <div className={styles.brak}>BRAK DOSTĘPU</div>
            }
        </div>
    );
}

export default FormComponent