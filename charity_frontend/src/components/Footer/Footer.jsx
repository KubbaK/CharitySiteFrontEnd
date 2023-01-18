// MIT License
// Copyright (c) 2014 Call-Em-All, https://v4.mui.com/

import React from "react";
import styles from './Footer.module.scss'
import CopyrightIcon from '@mui/icons-material/Copyright';
import Regulamin from "../FooterPopUps/Regulamin";
import ContactUs from "../FooterPopUps/ContactUs";

const Footer = () => (
    <div className={styles.footer}>
      <div className={styles.firstline}>Copyright  2022 <CopyrightIcon fontSize=""/> JK ŁK KŁ   </div>
      <div className={styles.secondline}><ContactUs/></div>
      <div className={styles.thirdline}><Regulamin/></div>
    </div>
  );
  
  export default Footer;