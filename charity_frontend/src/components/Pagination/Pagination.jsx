import React from 'react'
import styles from "./Pagination.module.scss"

const Pagination = ({totalEvents, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i<=(totalEvents); i++){
        pageNumbers.push(i);
    }

    return(
        <div className={styles.wrapper}>
            {pageNumbers.map(number => (
                <li key={number} className={styles.li}>
                    <a onClick={() => {paginate(number);window.scrollTo(0, 0)}} href='#!'>
                        {number}
                    </a>
                </li>
            ))}
        </div>
    )
}

export default Pagination