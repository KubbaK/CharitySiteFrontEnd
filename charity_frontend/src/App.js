import './App.css';
import React from 'react';
import {Route,Routes} from "react-router-dom"
import Signup from './components/SignUp/SignUp.jsx'
import Login from './components/Login/Login.jsx'
import MainPage from './components/MainPage/MainPage';
import EventTypeChoose from './components/EventTypeChoose/EventTypeChoose';
import FormComponent from './components/FormComponent/FormComponent';
import UserAccount from './components/UserAccount/UserAccount';

function App() {
  //const user = localStorage.getItem("token")
  return (
    <Routes>
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="" exact element={<MainPage/>}/>
      <Route path="/eventTypeChoose" exact element={<EventTypeChoose/>}/>
      <Route path="/form" exact element={<FormComponent/>}/>
      <Route path="/userAccount" exact element={<UserAccount/>}/>
    </Routes>
    
  );
}

export default App;
