import React from "react"
import NavBar from "../NavigationBar/NavBar.jsx"
import { useCookies } from "react-cookie";

const MainPage = (props) =>{
    const [jwtcookie] = useCookies(['jwt'])
    console.log(jwtcookie.jwt)
    return(
        <NavBar/>
    );
}

export default MainPage