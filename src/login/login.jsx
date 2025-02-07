import React from 'react';
import './login.css';

export function Login() {
  return (
    <main className="login-main">
        <div className="login-box">
        <h2>Login or create an account!</h2>
        <form action="play.html">
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
            <button type="submit" id="login-btn">Login</button>
            <button type="submit" id="create-btn">Create</button>
        </form>
        </div>
    </main>);
}