import React from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

const loginButton = (btnText,destination) => {
    const navigate = useNavigate();
    const handleClick = (event) => {
        event.preventDefault();
        navigate(destination);
    }
    return (
        <button type="submit" id="login-btn" onClick={handleClick}>{btnText}</button>
    )
}

export function Login() {
  return (
    <main className="login-main">
        <div className="login-box">
        <h2>Login or create an account!</h2>
        <form> 
            <div className="inputs">
                <label for="email">Email: </label>
                <input 
                type="email" 
                id="email" 
                name="email"
                placeholder="snakewars@click.com" />
            </div>
            <div className="inputs">
                <label for="password">Password: </label>
                <input 
                type="password" 
                id="password" 
                name="password"
                placeholder="1l0v3snak3s" />
            </div>
            {loginButton("Login","./play")}
            <button type="submit" id="create-btn">Create</button>
        </form>
        </div>
    </main>);
}