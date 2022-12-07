import React from 'react'
import styles from "./AdminPanel.module.scss"
import NavBar from "../NavigationBar/NavBar.jsx"
import AdminContainer from "../AdminContainer/AdminContainer.jsx"

const AdminPanel = () => {
    return(
        <div>
            <NavBar/>
            <div className={styles.title}>AKCJE DO WERYFIKACJI</div>
            <AdminContainer/>
        </div>
    )
}

export default AdminPanel