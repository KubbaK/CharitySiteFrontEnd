import React, {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import styles from './EditEvent.module.scss'
import jwtDecode from 'jwt-decode'
import CloseIcon from '@mui/icons-material/Close';
import {useCookies} from "react-cookie"
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer.jsx"
import EventAdd from '../ButtonPopUps/EventAdd';
import axios from 'axios';

const EditEvent = () => {
    const params = useParams();
    const Eventid = params.id
    const [eventData,setEventData] = useState("")

    const [errorT, setError] = useState("")
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
    const unverify = async () => {
        await unverifyVolunteering().then(await sleep(900)).then(await unverifyFundraising()).then(await sleep(700)).then(await unverifyAll())
    }
    const unverifyF = async () => {
        await unverifyFundraising().then(await sleep(900)).then(await unverifyAll())
    }
    const unverifyV = async () => {
        await unverifyVolunteering().then(await sleep(900)).then(await unverifyAll())
    }
    const unverifyAll = async () => {
         axios({method:'patch',url:`http://localhost:5012/v1/CharityEvent/${eventData.idCharityEvent}?isVerified=false&isActive=false&isDenied=false`,headers:{Authorization: `Bearer ${token}`}})
         
    }
    const unverifyFundraising = async () => {
        axios({method:'patch',url:`http://localhost:5012/v1/CharityEventFundraising/${eventData.idCharityFundraising}?isVerified=false&isActive=false&isDenied=false`,headers:{Authorization: `Bearer ${token}`}})
    }
    const unverifyVolunteering = async () => {
        axios({method:'patch',url:`http://localhost:5012/v1/CharityEventVolunteering/${eventData.idCharityVolunteering}?isVerified=false&isActive=false&isDenied=false`,headers:{Authorization: `Bearer ${token}`}})
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
            idOrganizer:id
        }

        const fundraisingBody = {
            fundTarget:fundTarget,
            amountOfMoneyToCollect:money
        }

        const volunteeringBody = {
            amountOfNeededVolunteers:volunteers
        }
        await axios({method:'put',url:"http://localhost:5012/v1/CharityEvent/"+Eventid,data:body,headers:{'Content-Type': 'application/json',Authorization: `Bearer ${token}`}})
        .then(await sleep(500)).then(await unverify())
        if(selectedFile !== null){
            await axios({method:'put',url:"http://localhost:5012/v1/CharityEvent/image/"+Eventid,data:formdata,headers:{'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}`}})
            .then(await sleep(500)).then(await unverify())
        }
        if(eventData.idCharityFundraising !== null){
            await axios({method:'put',url:"http://localhost:5012/v1/CharityEventFundraising/"+eventData.idCharityFundraising,data:fundraisingBody,headers:{'Content-Type': 'application/json',Authorization: `Bearer ${token}`}})
            .then(await sleep(500)).then(await unverifyF())
        }
        if(eventData.idCharityVolunteering !== null){
            await axios({method:'put',url:"http://localhost:5012/v1/CharityEventVolunteering/"+eventData.idCharityVolunteering,data:volunteeringBody,headers:{'Content-Type': 'application/json',Authorization: `Bearer ${token}`}})
            .then(await sleep(500)).then(await unverifyV())
        }
        sleep(10000)
        navigate(-1)
    }

    const renderData = async (response) =>{
        setTitle(response.title)
        setDescription(response.description)
        if(response.idCharityFundraising !== null){
            setFundTarget(response.charityEventFundraising.fundTarget)
            setMoney(response.charityEventFundraising.amountOfMoneyToCollect)
        }
        if(response.idCharityVolunteering !== null){
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
                    value={title} spellcheck="false"
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </div>

            <div className={styles.field2}>
            <div><label className={styles.field2_label}> Opis akcji </label> </div>
            <textarea className={styles.input2} placeholder="Podaj opis" 
                value={description} spellcheck="false"
                onChange={(e) => setDescription(e.target.value)} 
             />
            </div>

            {eventData.idCharityFundraising !== null &&
            <div className={styles.field3}>    
            <div><label className={styles.field3_label}> Cel zbiórki</label></div>
            <textarea className={styles.input3} placeholder="Podaj cel"
                value={fundTarget} spellcheck="false"
                onChange={(e) => setFundTarget(e.target.value)} 
             />
            </div>}
            
            {eventData.idCharityFundraising !== null &&
            <div className={styles.field4}>    
            <div><label className={styles.field4_label}>Kwota do zebrania</label></div>
            <input type="number" min="1" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                event.preventDefault();}}} 
                className={styles.input4} placeholder="Podaj kwotę"
                value={money}
                onChange={(e) => setMoney(e.target.value)} 
             />
            </div>}
            
            {eventData.idCharityVolunteering !== null &&
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
            <div style={{textAlign:'center',marginRight:'60px'}}>   
                {eventData.idCharityFundraising === null && <EventAdd/>}
                {eventData.idCharityVolunteering === null && <EventAdd/>}
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