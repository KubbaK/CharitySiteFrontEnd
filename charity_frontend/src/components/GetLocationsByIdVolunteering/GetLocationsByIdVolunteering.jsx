import { useEffect, useState } from "react"
import React from 'react';
import styles from "./GetLocationsByIdVolunteering.module.scss"
import axios from "axios"
import { useCookies } from 'react-cookie'

const GetLocationsByIdVolunteering = (props) => {
    const [locations, setLocations] = useState([])

const [jwtcookie,,] = useCookies(["jwt"]);
const token = jwtcookie.jwt

const fetchLocationsByIdVolunteering = () =>
{ 
     axios.get("http://localhost:5012/v1/location/CharityEventVolunteering/"+props.id,
    {
        headers:{ Authorization: `Bearer ${token}`}
    }).then(response => {
        setLocations(response.data);
    });
}

useEffect(() => {
    fetchLocationsByIdVolunteering();
}, []);


    return (
        <div>
            <div style={{textAlign:'center',marginBottom:'20px',fontSize:'25px'}}>Dostępne lokacje</div>
        <div className={styles.box}> 
          {
           (locations.length !== 0) ? (
           <div className={styles.box1}>
            {
                
                locations.map((val, key) => {
                return (
           <div className={styles.element} key={key}> 
                <div style={{display:'flex'}}> 
                <div className={styles.name}>Miasto: </div> <div>{val.town}, {val.postalCode} </div> 
                <div className={styles.name} style={{marginLeft:'20px'}}> Ulica:</div> <div>  {val.street} </div>
                </div>
           </div>)}).reverse()
            } 
                </div> ) : ( <div>Brak lokacji w danej akcji wolontariackiej</div> )
            }
    
        </div>
            </div>
    )
}

export default GetLocationsByIdVolunteering