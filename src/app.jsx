import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Leaderboard } from './leaderboard/leaderboard';
import { AuthState } from "./login/authState.js";


export default function App() {

    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    const [highScore, setHighScore] = React.useState(() => {
        const storedScore = localStorage.getItem( "highscore" );
        return storedScore ? JSON.parse(storedScore) : 0});

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
        <Route path='/play' element={<Play userName={userName} highScore={highScore} setHighScore={setHighScore}/>} />
        <Route path='/leaderboard' element={<Leaderboard userName={userName} highScore={highScore}/>} />
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