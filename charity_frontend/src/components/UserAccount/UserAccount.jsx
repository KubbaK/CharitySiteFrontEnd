import {React} from 'react'
import Footer from '../Footer/Footer'
import NavBar from '../NavigationBar/NavBar'
import styles from './UserAccount.module.scss'

const UserAccount = () => {
    return(
        <div className={styles.page}>
            <NavBar/>
            <div className={styles.userData}>

            </div>
            <div style={{height:'114px'}}></div>
            <Footer/>
        </div>
    )
}

export default UserAccount