import { useEffect, useState } from "react"
import React from 'react';
import styles from "./GetDonationsById.module.scss"
import axios from "axios"
import { useCookies } from 'react-cookie'

const GetDonationsById = (props) => {
    const [donation, setDonation] = useState([])

const convertDate = (date) =>
{
    return ((new Date(date)).toLocaleDateString()).toString() + " " + ((new Date(date)).toLocaleTimeString()).toString()
}
    

const [jwtcookie,,] = useCookies(["jwt"]);
const token = jwtcookie.jwt

const fetchDonationsByFundraisingId = () =>
{ 
     axios.get("http://localhost:5012/v1/Donation/charityEventFundraising/"+props.id,
    {
        headers:{ Authorization: `Bearer ${token}`}
    }).then(response => {

        setDonation(response.data);

    });
    
}
useEffect(() => {
    fetchDonationsByFundraisingId();
}, []);




    return (
        <div>
            <div style={{textAlign:'center',marginBottom:'20px',fontSize:'25px'}}>Dokonane donacje:</div>
        <div className={styles.box}> 
            
          {
           (donation.length !== 0) ? (
           <div className={styles.box1}>
            {
                
            donation.map((val, key) => {
                return (
            
           <div className={styles.element} key={key}> 
          <div> <div className={styles.name} >Użytkownik: </div> <div>  {val.user.login} </div>  </div> 
          <div> <div className={styles.name}>Data donacji: </div> <div>  {convertDate(val.donationDate)} </div> </div> 
          <div> <div className={styles.name}>Kwota: </div> <div>  {val.amountOfDonation} </div> </div> 
          <div>  <div className={styles.name}>Opis: </div> <div>  {val.description}</div>  </div> 
           </div>

            )}).reverse()
            } 
            </div> ) : ( <div>Nie dokonano jeszcze żadnej donacji</div> )
            }
    
        </div>
        </div>
    )
}

export default GetDonationsById