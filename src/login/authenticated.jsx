import React from "react";
import { useNavigate } from "react-router-dom";


export function AuthenticatedLogin({onLogout}) {
    const navigate = useNavigate()

    const logout = () => {
        fetch("/api/auth/logout", {
            method: "DELETE",
        })
        .catch(() => {
            console.log("failed to logout")
        })
        .finally(() => {
            localStorage.removeItem("userName");
            onLogout()
            console.log("logged out!")
        })
    }
  return (
    <>
        <h2>Successfully Logged In!</h2>
        <form> 
            <button id="login-btn" onClick={() => navigate("/play")} >Play</button>
            <button id="create-btn" onClick={logout}>Logout</button>
        </form>
    </>);
}