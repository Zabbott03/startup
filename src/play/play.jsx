import React from 'react';

import './play.css';

function gameBoard() {
    let board = [];
    for (let i = 0; i < 255; i++) {
        board.push(<div class='square'></div>);
    }
    return board;
}

export function Play() {
  return (
    <main>
        <div className="container">
            <div className="score-bar">
                <h4>P1: 11 points</h4>
                <h4>P2: 12 points</h4>
                <h4>P3: 6 points</h4>
            </div>
            <div className="canvas-placeholder">
                {gameBoard()}
            </div>
            <div>
            <button className="start-btn">Start Game</button>
            <button className="end-btn">End Game</button>
            </div>
        </div>
    </main>);
}