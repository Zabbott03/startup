import React from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';
import { UnauthenticatedLogin } from "./unauthenticated.jsx"
import { AuthenticatedLogin } from "./authenticated.jsx"

export function Login() {
  return (
    <main className="login-main">
        <div className="login-box">
        {/* <UnauthenticatedLogin /> */}
        <AuthenticatedLogin />

        
        </div>
    </main>);
}



// I left off about to add the authenticated login section to this, also about to pass in the props to Login() from App.jsx so that it can toggle
// between authenticated and Unauthenticated