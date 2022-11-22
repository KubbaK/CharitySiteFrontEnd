import React from 'react'
import styles from "./Pagination.module.scss"

const Pagination = ({eventsPerPage, totalEvents, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i<=(Math.ceil(totalEvents/eventsPerPage)); i++){
        pageNumbers.push(i);
    }

    return(
        <div className={styles.wrapper}>
            {pageNumbers.map(number => (
                <li key={number} className={styles.li}>
                    <a onClick={() => paginate(number)} href='#!'>
                        {number}
                    </a>
                </li>
            ))}
        </div>
    )
}

export default Pagination