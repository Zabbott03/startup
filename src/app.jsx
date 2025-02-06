import React from 'react';

import './app.css';

import { Login } from './login/login';
import { Play } from './play/play';
import { Leaderboard } from './leaderboard/leaderboard';



export default function App() {
  return (
    <div className="body">
        <header>
            <h1>Snake Wars!</h1>
            <ul class="header-bar">
                <li><a href="index.html">Home</a></li>
                <li><a href="play.html">Play</a></li>
                <li><a href="leaderboard.html">Leaderboard</a></li>
            </ul>
        </header>
        <main>Content</main>
        <footer>
            <p>
                Contributer(s): Zach Abbott
            </p>
            <p>
                <a href="https://github.com/Zabbott03/startup/tree/main" target="_blank">Github</a>
            </p>
        </footer>
    </div>);
}