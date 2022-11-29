import React from 'react'
import styles from './EventBoxVolunteer.module.scss'
import { Box } from '@mui/system'
import PhotoContainer from '../PhotoContainer/PhotoContainer'
import {useNavigate} from 'react-router-dom';
import Image1 from '../images/jest.png'
import { Link } from 'react-router-dom';

const EventBoxVolunteer = (props) =>{
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/login")
    }
    const truncate = (input) =>
      (input?.length > 200 && props.title.length > 60) ? `${input.substring(0, 250)}...` :
      (input?.length > 200 && props.title.length <= 60) ? `${input.substring(0, 180)}...` : input;

    return(
        <div>
        <Link style={{ textDecoration: 'none' }} to={{pathname: `/event/${props.charityId}`}}><Box className={styles.box} name="boxik" sx={{ borderRadius: 15 }} onClick={handleClick}> 
            <PhotoContainer  image={Image1}/>   
                <h2 className={styles.h2}>{props.title}</h2>
                <h3 className={styles.h3}>{truncate(props.description)}</h3>
                <h3 className={styles.h3}>Potrzebni wolontariusze: {props.volunteers}</h3>
            </Box></Link>
        </div>
    )
}

export default EventBoxVolunteer