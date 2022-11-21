import React, {useState} from 'react';
import styles from './EventFormDonation.module.scss'
import jwtDecode from 'jwt-decode'
import Footer from "../Footer/Footer.jsx"
import axios from 'axios';
import {useCookies} from "react-cookie"
import { useNavigate } from 'react-router-dom';

const EventFormDonation = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fundTarget, setFundTarget] = useState("");
    const [money, setMoney] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [jwtcookie,,] = useCookies(["jwt"]);
    const navigate = useNavigate()
    const token = jwtcookie.jwt
    const decoded = jwtDecode(token)
    const id = decoded.Id
    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            let res = await axios.post("http://localhost:5012/v1/CharityEvent",{
                isVolunteering: false,
                isFundraising: true,
                title: title,
                description: description,
                organizerId: id,
                imageId : 1,
                fundTarget: fundTarget,
                amountOfMoneyToCollect: money,
                amountOfNeededVolunteers: 0
            },
            {headers:{Authorization: `Bearer ${token}`}})
            if (res.status === 200) {
                setMessage("Dodano ogłoszenie!");
                await sleep(2000)
                navigate("/")
                console.log(res)
              } else {
                setMessage("Spróbuj jeszcze raz"); 
                
              }
            } catch (err) {
              console.log(err);
            }
    }
    return (
        <div className={styles.main_container}>
            
        <div className = {styles.form_box}>
        <form onSubmit={handleSubmit}>
            <div className ={styles.field1}>
                <div><label className={styles.field1_label}> Tytuł akcji  </label></div>
                <input className={styles.input} placeholder="Podaj tytuł"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </div>

            <div className={styles.field2}>
            <div><label className={styles.field2_label}> Opis akcji </label> </div>
            <input className={styles.input2} placeholder="Podaj opis" 
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
             />
            </div>

            <div className={styles.field3}>    
            <div><label className={styles.field3_label}> Cel zbiórki</label></div>
            <input className={styles.input3} placeholder="Podaj cel"
                value={fundTarget}
                onChange={(e) => setFundTarget(e.target.value)} 
             />
            </div>

            <div className={styles.field4}>    
            <div><label className={styles.field4_label}>Kwota do zebrania</label></div>
            <input type="number" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                event.preventDefault();}}} 
                className={styles.input4} placeholder="Podaj kwotę"
                value={money}
                onChange={(e) => setMoney(e.target.value)} 
             />
            </div>
            
            <div className={styles.field5}>    
            <div><label className={styles.field5_label}>Dodaj zdjęcie tytułowe do twojego ogłoszenia</label></div>
            <input className={styles.inputIm} type="file" 
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept="image/*"
            />
            </div>

            <button type = "submit" id= "submitBtn" className ={styles.sub_btn}> Dodaj Ogłoszenie</button>
            <div className={styles.message}>{message ? <p>{message}</p> : null}</div>
        </form>
        
    </div>
    <Footer/>
</div>
)
}

export default EventFormDonation