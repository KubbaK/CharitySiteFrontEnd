import { useEffect, useState } from "react"
import React from 'react';
import styles from "./GetDonationsById.module.scss"
import axios from "axios"
import { useCookies } from 'react-cookie'

const GetDonationsById = (props) => {
    const [donation, setDonation] = useState([{
        charityFundraisingIdCharityFundraising: null, 
        donationId: null, 
        amountOfDonation: null, 
        donationDate: null,
        description: null, 
        userIdUser: null,
        user: {idUser: null, login: "", email: ""}
    }])

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
        console.log(response);
    });
    
}
useEffect(() => {
    fetchDonationsByFundraisingId();
}, []);




    return (
        <div className={styles.box}>
            <div className={styles.box1}>
            {
            donation.map((val, key) => {
                return (
            
           <div className={styles.element} key={key}> 
          <div> <div className={styles.name} >Użytkownik: </div> <div>  {val.user.login} </div>  </div> 
          <div> <div className={styles.name}>Data donacji: </div> <div>  {val.donationDate} </div> </div> 
          <div> <div className={styles.name}>Kwota: </div> <div>  {val.amountOfDonation} </div> </div> 
          <div>  <div className={styles.name}>Opis: </div> <div>  {val.description}</div>  </div> 
           </div>

            )})
            }
            </div>
        </div>
    )
}

export default GetDonationsById