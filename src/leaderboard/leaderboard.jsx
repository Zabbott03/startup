import React from 'react';

import './leaderboard.css';

export function Leaderboard({userName, highScore}) {

    const [snakeFact, setSnakeFact] = React.useState("Retrieving snake fact...")
    const today = (new Date()).toLocaleDateString('en-US');


    React.useEffect(() => {
        setSnakeFact("Snake Fact: Arizona is home to 13 different species of rattlesnakes.")
    })

  return (
    <main>
        <h4 className="snake-fact">{snakeFact}</h4>
        <table className="leaderboard">
        <thead>
        <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
            <th>Date</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td className="first-place">1</td>
            <td>{userName}</td>
            <td>{highScore}</td>
            <td>{today}</td>
        </tr>
        <tr>
            <td className="second-place">2</td>
            <td>Player 2</td>
            <td>0</td>
            <td>1/23/25</td>
        </tr>
        <tr>
            <td className="third-place">3</td>
            <td>Player 3</td>
            <td>0</td>
            <td>1/25/25</td>
        </tr>
        </tbody>
        </table>
    </main>);
}