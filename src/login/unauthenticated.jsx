import React from 'react';
import { useNavigate } from "react-router-dom";

import './login.css';


export function UnauthenticatedLogin({ username, onLogin}) {

    const [userName, setUserName] = React.useState(username)
    const [password, setPassword] = React.useState('');


    function loginUser() {
        localStorage.setItem('userName', userName);
        localStorage.setItem('password', password);
        onLogin(userName);
      }
    
    function createUser() {
        localStorage.setItem('userName', userName);
        onLogin(userName);
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
                placeholder="Snake King"
                onChange={(e) => setUserName(e.target.value)}
                />
            </div>
            <div className="inputs">
                <label htmlFor="password">Password: </label>
                <input 
                type="password" 
                id="password" 
                name="password"
                placeholder="1l0v3snak3s" 
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="button" id="login-btn" onClick={loginUser} disabled={!userName || !password}>Login</button>
            <button type="button" id="create-btn" onClick={createUser} disabled={!userName || !password}>Create</button>
        </form>
    </>);
}