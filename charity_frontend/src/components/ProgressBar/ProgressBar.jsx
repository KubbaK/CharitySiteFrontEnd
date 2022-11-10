import React from "react";
import styles from './ProgressBar.module.scss'
import Box from '@mui/system/Box';

const ProgressBar = (props) => {
    
    const fillerStyles = props.progress < 100 ? {
        height: '100%',
        width: `${props.progress}%`,
        backgroundColor: "#5c56db",
        borderRadius: 'inherit',
        textAlign: 'right'
      }:
      {
        height: '100%',
        width: `100%`,
        backgroundColor: "#5c56db",
        borderRadius: 'inherit',
        textAlign: 'right'
      }
    return (
        <div>
        <Box className={styles.containerStyles}>
            <Box style={fillerStyles}>
                {props.progress > 30 && props.progress < 100 &&
                    <Box className={styles.labelStyles}>zebrano {props.progress}%</Box>
                }
                {props.progress <= 30 &&
                    <Box className={styles.labelStyles}>{props.progress}%</Box>
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