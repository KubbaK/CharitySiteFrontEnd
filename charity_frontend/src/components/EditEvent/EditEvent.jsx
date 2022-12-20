import React, {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import styles from './EditEvent.module.scss'
import jwtDecode from 'jwt-decode'
import CloseIcon from '@mui/icons-material/Close';
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer.jsx"
import { Button } from "@mui/material";
import axios from 'axios';

const EditEvent = () => {
    const params = useParams();
    const Eventid = params.id
    const [eventData,setEventData] = useState("")

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fundTarget, setFundTarget] = useState("");
    const [volunteers, setVolunteers] = useState([]);
    const [money, setMoney] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [jwtcookie,,] = useCookies(["jwt"]);

    const token = jwtcookie.jwt
    const decoded = jwtDecode(token)
    const id = decoded.Id
    const navigate = useNavigate();
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const goBack = () =>{
        navigate(-1)
      }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formdata = new FormData()
        if(selectedFile !== null){
            formdata.append("image",selectedFile,selectedFile.name)
        }
        const body = {
            title:title,
            description:description,
            organizerId:id
        }

        const fundraisingBody = {
            fundTarget:fundTarget,
            amountOfMoneyToCollect:money
        }

        const volunteeringBody = {
            amountOfNeededVolunteers:volunteers
        }
        await axios({method:'put',url:"http://localhost:5012/v1/CharityEvent/"+Eventid,data:body,headers:{'Content-Type': 'application/json',Authorization: `Bearer ${token}`}})
        if(selectedFile !== null){
            await axios({method:'put',url:"http://localhost:5012/v1/CharityEvent/image/"+Eventid,data:formdata,headers:{'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}`}})
        }
        if(eventData.fundraisingId !== null){
            await axios({method:'put',url:"http://localhost:5012/v1/CharityEventFundraising/"+eventData.fundraisingId,data:fundraisingBody,headers:{'Content-Type': 'application/json',Authorization: `Bearer ${token}`}})
        }
        if(eventData.volunteeringId !== null){
            await axios({method:'put',url:"http://localhost:5012/v1/CharityEventVolunteering/"+eventData.volunteeringId,data:volunteeringBody,headers:{'Content-Type': 'application/json',Authorization: `Bearer ${token}`}})
        }
        sleep(10000)
        navigate(-1)
    }

    const renderData = async (response) =>{
        setTitle(response.title)
        setDescription(response.description)
        if(response.fundraisingId !== null){
            setFundTarget(response.charityEventFundraising.fundTarget)
            setMoney(response.charityEventFundraising.amountOfMoneyToCollect)
        }
        if(response.volunteeringId !== null){
            setVolunteers(response.charityEventVolunteering.amountOfNeededVolunteers)
        }
    }
    useEffect(() => {
        const fetchEvents = async () => {
            await axios.get("http://localhost:5012/v1/Search/"+Eventid,{headers:{Authorization: `Bearer ${token}`}})
            .then(response => {
            renderData(response.data)
            setEventData(response.data)
        });
        }
        fetchEvents()
        
    }, []);

    return (
        <div>
        <CloseIcon className={styles.close} onClick={goBack}/>
        <div className={styles.main_container}>
        <div className={styles.form_footer}>    
        <div className = {styles.form_box}>
        <div style={{textAlign:'center',fontSize:'30px',fontWeight:'bolder',marginRight:'10px'}}>Edytuj swoją akcję</div>
        <form onSubmit={handleSubmit}>
            <div className ={styles.field1}>
                <div><label className={styles.field1_label}> Tytuł akcji  </label></div>
                <textarea className={styles.input} placeholder="Podaj tytuł"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </div>

            <div className={styles.field2}>
            <div><label className={styles.field2_label}> Opis akcji </label> </div>
            <textarea className={styles.input2} placeholder="Podaj opis" 
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
             />
            </div>

            {eventData.fundraisingId !== null &&
            <div className={styles.field3}>    
            <div><label className={styles.field3_label}> Cel zbiórki</label></div>
            <textarea className={styles.input3} placeholder="Podaj cel"
                value={fundTarget}
                onChange={(e) => setFundTarget(e.target.value)} 
             />
            </div>}
            
            {eventData.fundraisingId !== null &&
            <div className={styles.field4}>    
            <div><label className={styles.field4_label}>Kwota do zebrania</label></div>
            <input type="number" min="1" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                event.preventDefault();}}} 
                className={styles.input4} placeholder="Podaj kwotę"
                value={money}
                onChange={(e) => setMoney(e.target.value)} 
             />
            </div>}
            
            {eventData.volunteeringId !== null &&
            <div className={styles.field4}>    
            <div><label className={styles.field4_label}>Ilość potrzebnych wolontariuszy</label></div>
            <input type="number" min="1" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                event.preventDefault();}}} 
                className={styles.input4} placeholder="Podaj ilość"
                value={volunteers}
                onChange={(e) => setVolunteers(e.target.value)} 
             />
            </div>}

            <div className={styles.field5}>    
            <div><label className={styles.field5_label}>Edytuj zdjęcie tytułowe do twojej akcji</label></div>
            <input className={styles.inputIm} type="file" 
                id="file" 
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept="image/*"
            />
            </div>
            <div style={{textAlign:'center'}}>   
                {eventData.fundraisingId === null && <Button className={styles.add}>Dodaj moduł pieniężny</Button>}
                {eventData.volunteeringId === null && <Button className={styles.add}>Dodaj moduł wolontariacki</Button>}
            </div> 
            <button type = "submit" id= "submitBtn" className ={styles.sub_btn}> Edytuj Ogłoszenie</button>
            <div className={styles.message}>{message ? <p>{message}</p> : null}</div>
        </form>
        
    </div>
    </div>
    <Footer/>
    
</div>

</div>
)
}

export default EditEvent