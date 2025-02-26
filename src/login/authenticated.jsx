import React from "react";
import { useNavigate } from "react-router-dom";


export function AuthenticatedLogin() {


  return (
    <>
        <h2>Successfully Logged In!</h2>
        <form> 
            {/* <LoginButton btnText={"Login"} destination={"./play"}/> */}
            <button id="login-btn" useNavigate>Play</button>
            <button id="create-btn">Logout</button>
        </form>
    </>);
}