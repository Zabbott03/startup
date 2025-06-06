import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import { Login } from './login/login';
import { Play } from './play/play';
import { Leaderboard } from './leaderboard/leaderboard';
import { AuthState } from "./login/authState.js";


export default function App() {

    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [recentScores, setRecentScores] = React.useState([]);
    const [allTimeScores, setAllTimeScores] = React.useState([]);
   
    useEffect(() => {
        const preventArrowScroll = (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            if (window.location.pathname.includes('/play')) {
                e.preventDefault()
            }}
        };
        window.addEventListener('keydown', preventArrowScroll)
        return () => {
            window.removeEventListener('keydown', preventArrowScroll)
        };
        }, []);
    
    return (

    <BrowserRouter>
    <div className="body">
        <header>
            <h1>Snake Wars!</h1>
            <ul className="header-bar">
                <li><NavLink to="">Login</NavLink></li>
                {authState == AuthState.Authenticated && 
                <li><NavLink to="play">Play</NavLink></li>
                }
                {authState == AuthState.Authenticated && 
                <li><NavLink to="leaderboard">Leaderboard</NavLink></li>
                }
            </ul>
        </header>
        <Routes>
        <Route path='/' element={<Login 
        userName={userName}
        authState={authState}
        onAuthChange={(userName, authState) => {
          setAuthState(authState);
          setUserName(userName);
        }
        }/>} exact />
        <Route path='/play' element={
            <Play 
            userName={userName} 
            setRecentScores={setRecentScores}
            setAllTimeScores={setAllTimeScores}
            // highScore={highScore} 
            // setHighScore={setHighScore}
            />} />
        <Route path='/leaderboard' element={
            <Leaderboard 
            recentScores={recentScores} 
            allTimeScores={allTimeScores} 
            setRecentScores={setRecentScores} 
            setAllTimeScores={setAllTimeScores} 
            />} />
        <Route path='*' element={<NotFound />} />
        </Routes>
        <footer>
            <p>
                Contributer(s): Zach Abbott
            </p>
            <p>
                <NavLink to="https://github.com/Zabbott03/startup/tree/main" target="_blank">Github</NavLink>
            </p>
        </footer>
    </div>
    </BrowserRouter>);
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }