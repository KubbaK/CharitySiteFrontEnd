import { useEffect, useState } from "react"
import React from 'react';
import styles from "./GetVolunteersById.module.scss"
import axios from "axios"
import { useCookies } from 'react-cookie'

const GetVolunteersById = (props) => {
    const [volunteers, setVolunteers] = useState([])

const [jwtcookie,,] = useCookies(["jwt"]);
const token = jwtcookie.jwt

const fetchGetVolunteersByVolunteeringId = () =>
{ 
     axios.get("http://localhost:5012/v1/Volunteer/"+props.id,
    {
        headers:{ Authorization: `Bearer ${token}`}
    }).then(response => {
        setVolunteers(response.data);
    });
}

useEffect(() => {
    fetchGetVolunteersByVolunteeringId();
}, []);




    return (
        <div className={styles.box}> 
       
          {
           (volunteers.length !== 0) ? (
           <div className={styles.box1}>
            {
                
          volunteers.map((val, key) => {
                return (
           <div className={styles.element} key={key}> 
          <div> <div className={styles.name} >Login użytkownika: </div> <div>  {val.login} </div>  </div> 
           </div>
            )})
            } 
            </div> ) : ( <div>Brak wolontariuszy</div> )
            }
    
        </div>

    )
}

export default GetVolunteersById