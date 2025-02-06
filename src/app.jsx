import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Leaderboard } from './leaderboard/leaderboard';



export default function App() {
  return (
    <BrowserRouter>
    <div className="body">
        <header>
            <h1>Snake Wars!</h1>
            <ul className="header-bar">
                <li><NavLink to="login">Home</NavLink></li>
                <li><NavLink to="play">Play</NavLink></li>
                <li><NavLink to="leaderboard">Leaderboard</NavLink></li>
            </ul>
        </header>
        <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/play' element={<Play />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
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