import './App.css';
import React from 'react';
import {Route,Routes} from "react-router-dom"
import Signup from './components/SignUp/SignUp.jsx'
import Login from './components/Login/Login.jsx'
import MainPage from './components/MainPage/MainPage';

function App() {
  //const user = localStorage.getItem("token")
  return (
    <Routes>
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="" exact element={<MainPage/>}/>
    </Routes>
    
  );
}

export default App;
