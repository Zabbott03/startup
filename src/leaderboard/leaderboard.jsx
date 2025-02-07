import React from 'react';

import './leaderboard.css';

export function Leaderboard() {
  return (
    <main>
        <h4 className="snake-fact">Snake Fact: Arizona is home to 13 different species of rattlesnakes.</h4>
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
            <td>Player 1</td>
            <td>86</td>
            <td>1/21/25</td>
        </tr>
        <tr>
            <td className="second-place">2</td>
            <td>Player 2</td>
            <td>43</td>
            <td>1/23/25</td>
        </tr>
        <tr>
            <td className="third-place">3</td>
            <td>Player 3</td>
            <td>40</td>
            <td>1/25/25</td>
        </tr>
        </tbody>
        </table>
    </main>);
}