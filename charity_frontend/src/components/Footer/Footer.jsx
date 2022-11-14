import React from "react";
import styles from './Footer.module.scss'
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => (
    <div className={styles.footer}>
      <div className={styles.firstline}>Copyright  2022 <CopyrightIcon fontSize=""/> JK ŁK KŁ   </div>
      <div className={styles.secondline}>Contact Us</div>
      <div className={styles.thirdline}>Privacy Policy</div>
    </div>
  );
  
  export default Footer;