import React from 'react';
import { useNavigate } from "react-router-dom";

import './login.css';


export function UnauthenticatedLogin({ username, onLogin}) {

    const [userName, setUserName] = React.useState(username)
    const [password, setPassword] = React.useState('');


    async function loginUser() {

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: userName,
                password: password
            })
            })
        if (response.status === 201) {
            onLogin(userName);
            localStorage.setItem('userName', userName);
        } else {
            const body = await response.json();
            alert(body.error);
        }
      }
    
    async function createUser() {

        const response = await fetch("/api/auth/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userName,
                password: password
            })
        })

        if (response.status === 201) {
            onLogin(userName);
            localStorage.setItem('userName', userName);
        } else {
            const body = await response.json();
            alert(body.error);
        }
        return;
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
                required
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
                required
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="button" id="login-btn" onClick={loginUser} disabled={!userName || !password}>Login</button>
            <button type="button" id="create-btn" onClick={createUser} disabled={!userName || !password}>Create</button>
        </form>
    </>);
}