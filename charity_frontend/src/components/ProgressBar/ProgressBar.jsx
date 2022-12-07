import React from "react";
import styles from './ProgressBar.module.scss'
import Box from '@mui/system/Box';

const ProgressBar = (props) => {
    
    const fillerStyles = (props.progress < 100 && props.progress > 5) ? {
        height: '100%',
        width: `${props.progress}%`,
        backgroundColor: "#ffef00",
        borderRadius: 'inherit',
        textAlign: 'right',
      }: props.progress <= 5 ?{
        height: '100%',
        width: `0px`,
        backgroundColor: "#ffef00",
        borderRadius: 'inherit',
        textAlign: 'right',
      }:
      {
        height: '100%',
        width: `100%`,
        backgroundColor: "#ffef00",
        borderRadius: 'inherit',
        textAlign: 'right'
      }
    const DecimalProgress = Number.parseFloat(props.progress).toFixed(2);
    const small = "<5%"
    return (
        <div>
        <Box className={styles.containerStyles}>
            <Box style={fillerStyles}>
                {props.progress > 30 && props.progress < 100 &&
                    <Box className={styles.labelStyles}>zebrano {DecimalProgress}%</Box>
                }
                {props.progress <= 30 && props.progress > 10 &&
                    <Box className={styles.labelStyles}>{DecimalProgress}%</Box>
                }
                {props.progress <= 10 && props.progress > 5 &&
                    <Box className={styles.labelStyles}></Box>
                }
                {props.progress <= 5 && props.progress > 0 &&
                    <Box className={styles.labelStyles}>{small}</Box>
                }
                {props.progress === 0 &&
                    <Box className={styles.labelStyles}>0</Box>
                }
                {props.progress >= 100 &&
                    <Box className={styles.labelStyles}>zebrano 100%, dziękujemy</Box>
                }
            </Box>
        </Box>
    </div>
    );
  };
  
  export default ProgressBar;