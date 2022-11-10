import React from "react"
import NavBar from "../NavigationBar/NavBar.jsx"
import EventContainer from "../EventContainer/EventContainer.jsx"
import Footer from "../Footer/Footer.jsx"
import styles from './MainPage.module.scss'
import CarouselComponent from "../Carousel/Carousel.jsx"
import { useCookies } from "react-cookie"

const MainPage = (props) =>{
    const [jwtcookie] = useCookies(['jwt'])
    console.log(jwtcookie.jwt)
    return(
        <div className={styles.page}>
            <NavBar/>
            <CarouselComponent/>
            <h1 className={styles.h1}>POPULARNE ZBIÓRKI</h1>
                <div className={styles.event}>
                    <EventContainer/>
                </div>
                
            <Footer/>
        </div> 
    );
}

export default MainPage