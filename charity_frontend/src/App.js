import './App.css';
import React from 'react';
import {Route,Routes} from "react-router-dom"
import Signup from './components/SignUp/SignUp.jsx'
import Login from './components/Login/Login.jsx'
import MainPage from './components/MainPage/MainPage';
import EventTypeChoose from './components/EventTypeChoose/EventTypeChoose';
import FormComponent from './components/FormComponent/FormComponent';
import UserAccount from './components/UserAccount/UserAccount';
import AdminPanel from './components/AdminPanel/AdminPanel';
import GetEvent from './components/GetEvent/GetEvent';

function App() {
  return (
    <Routes>
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="" exact element={<MainPage/>}/>
      <Route path="/eventTypeChoose" exact element={<EventTypeChoose/>}/>
      <Route path="/form" exact element={<FormComponent/>}/>
      <Route path="/userAccount" exact element={<UserAccount/>}/>
      <Route path="/adminPanel" exact element={<AdminPanel/>}/>
      <Route path="/getEvents" exact element={<GetEvent/>}/>
    </Routes>
    
  );
}

export default App;
