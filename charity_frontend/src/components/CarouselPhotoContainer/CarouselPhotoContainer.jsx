import React from "react";
import styles from './CarouselPhotoContainer.module.scss'
import Box from '@mui/system/Box';

const CarouselPhotoContainer = (props) =>{
        return(
            <Box className={styles.box} name="photo" >
                <div className={styles.textbox}><p className={styles.text}>Jakiś tekst opisujący coś, na tym obrazku średnio widać</p></div>
                <div><img className={styles.image} src={props.image} alt="123"/></div>
                
            </Box>
        );
    }

export default CarouselPhotoContainer