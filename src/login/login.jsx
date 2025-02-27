import React from 'react';
import './login.css';
import { UnauthenticatedLogin } from "./unauthenticated.jsx"
import { AuthenticatedLogin } from "./authenticated.jsx"
import { AuthState } from './authState.js'

export function Login({ userName, authState, onAuthChange}) {
  return (
    <main className="login-main">
        <div className="login-box">
        {authState === AuthState.Authenticated && 
        <AuthenticatedLogin userName={userName} onLogout={() => {
            onAuthChange(userName, AuthState.Unauthenticated)
        }}/> }
        {authState === AuthState.Unauthenticated && 
        <UnauthenticatedLogin username={userName} onLogin={(loginUserName) => {
            onAuthChange(loginUserName, AuthState.Authenticated)
        }} />}

        </div>
    </main>);
}
