import React, {useState} from 'react';
import styles from './EventFormVolunteering.module.scss'
import jwt_decode from 'jwt-decode'
import Footer from "../Footer/Footer.jsx"
import axios from 'axios';

const EventFormVolunteering = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fundTarget, setFundTarget] = useState("");
    const [volunteers, setVolunteers] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async(e) => {
        const token = jwt_decode(localStorage.getItem("token"))
        const id = token._id
        e.preventDefault();
        try{
            let res = await axios.post("http://localhost:7500/sales",{
                isVolunteering: true,
                isFundraising: false,
                title: title,
                description: description,
                organizerId: 0,
                fundTarget: fundTarget,
                amountOfMoneyToCollect: volunteers,
                amountOfNeededVolunteers: 0
            },
            {headers:{'x-access-token': localStorage.getItem("token")}})
            console.log(res)
            if (res.status === 200) {
                setMessage("Dodano ogłoszenie!");
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
            <div><label className={styles.field4_label}>Ilość potrzebnych wolontariuszy</label></div>
            <input type="number" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                event.preventDefault();}}} 
                className={styles.input4} placeholder="Podaj ilość"
                value={volunteers}
                onChange={(e) => setVolunteers(e.target.value)} 
             />
            </div>
            <button type = "submit" id= "submitBtn" className ={styles.sub_btn}> Zamieść akcję</button>
            <div className={styles.message}>{message ? <p>{message}</p> : null}</div>
        </form>
        
    </div>
    <Footer/>
</div>
)
}

export default EventFormVolunteering