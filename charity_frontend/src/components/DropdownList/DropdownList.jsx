import React from 'react';
import styles from './DropdownList.module.scss'

const DropdownList = (props) => {
        return(
            <div className={styles.dropdown}>
                <a href="#" >{props.titlebutton}</a>
                <div className={styles.dropdownContent}>
                    <a href="#">{props.data1}</a>
                    <a href="#">{props.data2}</a>
                    <a href="#">{props.data3}</a>
                </div>
            </div>
        )
}

export default DropdownList
