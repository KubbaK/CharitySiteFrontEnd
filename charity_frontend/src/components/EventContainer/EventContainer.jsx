import React from "react";
import styles from './EventContainer.module.scss'
import Box from '@mui/system/Box';

class EventContainer extends React.Component{
    render(){
        return(
            <div className={styles.Box} onClick={this.props.onClick}>
            <Box name="boxik" color="white" bgcolor="lightgreen" p={1} sx={{ borderRadius: 15 }}>
                <h2>Tytuł ogłoszenia: {this.props.name}</h2>
                <h3 className={styles.h3}>{this.props.name2}</h3>
            </Box>
            </div>
        );
    }
}


export default EventContainer
