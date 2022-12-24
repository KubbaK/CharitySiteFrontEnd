import React, {useState} from 'react';
import styles from './EventFormVolunteering.module.scss'
import jwtDecode from 'jwt-decode'
import Footer from "../Footer/Footer.jsx"
import axios from 'axios';
import {useCookies} from "react-cookie"
import { useNavigate } from 'react-router-dom';

const EventFormVolunteering = () => {
    const [errorT, setError] = useState("")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [volunteers, setVolunteers] = useState("");
    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState('');

    const [jwtcookie,,] = useCookies(["jwt"]);
    const navigate = useNavigate()
    const token = jwtcookie.jwt
    const decoded = jwtDecode(token)
    const id = decoded.Id
    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

      const handleSubmit = async(e) => {
        if (selectedFile === null) {
            setError("Musisz dodać tytułowe zdjęcie do akcji!")
        }
        e.preventDefault();
        const formdata = new FormData()
        formdata.append("IsVolunteering",true)
        formdata.append("IsFundraising",false)
        formdata.append("Title",title)
        formdata.append("Description",description)
        formdata.append("IdOrganizer",id)
        formdata.append("ImageCharityEvent",selectedFile,selectedFile.name)
        for (let i = 0; i < files.length; i++) {
            formdata.append("ImagesCharityEvent", files[i])
        }
        formdata.append("AmountOfNeededVolunteers",volunteers)
        try{
            let res = await axios.post("http://localhost:5012/v1/CharityEvent",formdata,
            {headers:{'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}`}})
            if (res.status === 200) {
                setMessage("Dodano ogłoszenie!");
                await sleep(2000)
                navigate("/")
                console.log(res)
              } else {
                setMessage("Spróbuj jeszcze raz");
                
              }
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    if (error.response.data.errors.Title){
                        setError(error.response.data.errors.Title[0])
                    }
                    else if (error.response.data.errors.AmountOfNeededVolunteers){
                        setError(error.response.data.errors.AmountOfNeededVolunteers[0])
                    }
                    else if (error.response.data.errors.Image){
                        setError(error.response.data.errors.Image[0])
                    }
                   
                }
            }
    }
    return (
        <div className={styles.main_container}>
        <div className={styles.form_footer}>  
        <div className = {styles.form_box}>
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

            <div className={styles.field4}>    
            <div><label className={styles.field4_label}>Ilość potrzebnych wolontariuszy</label></div>
            <input type="number" min="1" onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {
                event.preventDefault();}}}  spellcheck="false"
                className={styles.input4} placeholder="Podaj ilość"
                value={volunteers}
                onChange={(e) => setVolunteers(e.target.value)} 
             />
            </div>

            <div className={styles.field5}>    
            <div><label className={styles.field5_label}>Dodaj zdjęcie tytułowe do twojej akcji</label></div>
            <input className={styles.inputIm} type="file" 
                id="file" 
                onChange={(e) => setSelectedFile(e.target.files[0])}
                accept="image/*"
            />
            </div>

            <div className={styles.field5}>    
            <div><label className={styles.field5_label}>Dodaj zdjęcia do twojej akcji</label></div>
            <input className={styles.inputIm} type="file" multiple 
                id="file1" 
                onChange={(e) => setFiles(e.target.files)}
                accept="image/*"
            />
            </div>

            <button type = "submit" id= "submitBtn" className ={styles.sub_btn} onClick={() => setError("")}> Zamieść akcję</button>
            {errorT && <div
                            className={styles.error_msg}>{errorT}</div>
            }
            {/* <div className={styles.message}>{message ? <p>{message}</p> : null}</div> */}
        </form>
        
    </div>
    </div>  
    <Footer/>
</div>
)
}

export default EventFormVolunteering