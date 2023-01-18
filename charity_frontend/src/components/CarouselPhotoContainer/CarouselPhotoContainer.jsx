// MIT License
// Copyright (c) 2014 Call-Em-All, https://v4.mui.com/

import React from "react";
import styles from './CarouselPhotoContainer.module.scss'
import Box from '@mui/system/Box';

const CarouselPhotoContainer = (props) =>{
        return(
            <Box className={styles.box} name="photo" >
                <img className={styles.image} src={props.image} alt="123"/>
                <div className={styles.textbox}><p className={styles.text}>Razem możemy więcej, grajmy w jednej drużynie!</p></div>
            </Box>
        );
    }
export default CarouselPhotoContainer
