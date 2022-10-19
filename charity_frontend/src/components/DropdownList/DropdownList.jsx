import React from "react";
import styles from './DropdownList.module.scss'

class DropdownList extends React.Component{
    render(){
        return(
            <div className={styles.dropdown}>
                <a href="#" >{this.props.titlebutton}</a>
                <div className={styles.dropdownContent}>
                    <a href="#">{this.props.data1}</a>
                    <a href="#">{this.props.data2}</a>
                    <a href="#">{this.props.data3}</a>
                </div>
            </div>
        );
    }
}

export default DropdownList
