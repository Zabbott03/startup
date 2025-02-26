import React from 'react';
import { useNavigate } from "react-router-dom";

import './login.css';


export function UnauthenticatedLogin() {

    const [userName, setUserName] = React.useState("")

    function loginUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      }
    
    function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
    }

  return (
    <>
        <h2>Login or create an account!</h2>
        <form> 
            <div className="inputs">
                <label htmlFor="username">Username: </label>
                <input 
                type="text" 
                id="username" 
                name="username"
                placeholder="Snake King" />
            </div>
            <div className="inputs">
                <label htmlFor="password">Password: </label>
                <input 
                type="password" 
                id="password" 
                name="password"
                placeholder="1l0v3snak3s" />
            </div>
            <button id="login-btn">Login</button>
            <button id="create-btn">Create</button>
        </form>
    </>);
}