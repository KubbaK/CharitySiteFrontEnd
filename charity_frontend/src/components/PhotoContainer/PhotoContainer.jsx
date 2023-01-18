// MIT License
// Copyright (c) 2014 Call-Em-All, https://v4.mui.com/

import React from "react";
import styles from './PhotoContainers.module.scss'
import Box from '@mui/system/Box';

const PhotoContainer = (props) =>{
        return(
            <Box className={styles.box} name="photo" >
                <img className={styles.image} src={props.image} alt="123"/>
            </Box>
        );
    }

export default PhotoContainer