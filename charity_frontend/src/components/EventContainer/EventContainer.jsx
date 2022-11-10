import React from "react";
import styles from './EventContainer.module.scss'
import Box from '@mui/system/Box';
import PhotoContainer from "../PhotoContainer/PhotoContainer";
import {useNavigate} from 'react-router-dom';
import Image1 from '../images/jest.png'
import ProgressBar from "../ProgressBar/ProgressBar";

const EventContainer= (props) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/login")
    }
        return(
            <div className={styles.Box}>
            <Box className={styles.box} name="boxik" sx={{ borderRadius: 15 }} onClick={handleClick}> 
            <PhotoContainer  image={Image1}/>   
                <h2>TUTAJ BĘDZIE TYTUŁ{props.name}</h2>
                <h3 className={styles.h3}>a tutaj będzie skrócony opis zbiórki,ograniczony
                    ilością słów żeby ładnie mieściło się wszystko w komponencie{props.name2}</h3>
                <ProgressBar progress={65}/>   
            </Box>
            <Box className={styles.box} name="boxik" sx={{ borderRadius: 15 }}> 
            <PhotoContainer image={Image1}/>   
                <h2>TUTAJ BĘDZIE TYTUŁ{props.name}</h2>
                <h3 className={styles.h3}>a tutaj będzie skrócony opis zbiórki{props.name2}</h3>
                <ProgressBar progress={89}/> 
            </Box>
            <Box className={styles.box} name="boxik" sx={{ borderRadius: 15 }}> 
            <PhotoContainer image={Image1}/>   
                <h2>TUTAJ BĘDZIE TYTUŁ{props.name}</h2>
                <h3 className={styles.h3}>a tutaj będzie skrócony opis zbiórki{props.name2}</h3>
                <ProgressBar progress={11}/> 
            </Box>
            <Box className={styles.box} name="boxik" sx={{ borderRadius: 15 }}> 
            <PhotoContainer image={Image1}/>   
                <h2>TUTAJ BĘDZIE TYTUŁ{props.name}</h2>
                <h3 className={styles.h3}>a tutaj będzie skrócony opis zbiórki{props.name2}</h3>
                <ProgressBar progress={20}/> 
            </Box>
            <Box className={styles.box} name="boxik" sx={{ borderRadius: 15 }}> 
            <PhotoContainer image={Image1}/>   
                <h2>TUTAJ BĘDZIE TYTUŁ{props.name}</h2>
                <h3 className={styles.h3}>a tutaj będzie skrócony opis zbiórki{props.name2}</h3>
                <ProgressBar progress={100}/> 
            </Box>
            
            </div>
        );
}


export default EventContainer

