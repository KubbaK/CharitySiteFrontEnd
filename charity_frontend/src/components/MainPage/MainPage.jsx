import React from "react"
import NavBar from "../NavigationBar/NavBar.jsx"
import EventContainer from "../EventContainer/EventContainer.jsx"
import Footer from "../Footer/Footer.jsx"
import styles from './MainPage.module.scss'
import CarouselComponent from "../Carousel/Carousel.jsx"

const MainPage = (props) =>{
    return(
        <div className={styles.page}>
            <NavBar/>
            <h1 className={styles.h12}>NAJWAŻNIEJSZE INFORMACJE</h1>
            <CarouselComponent/>
            <h1 className={styles.h1}>POPULARNE AKCJE ZE ZBIÓRKAMI PIENIĘDZY </h1>
                <div className={styles.event}>
                    <EventContainer/>
                </div>
                
            <Footer/>
        </div> 
    );
}

export default MainPage