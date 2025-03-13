import React from 'react';

import './leaderboard.css';

export function Leaderboard({ recentScores, allTimeScores, setRecentScores, setAllTimeScores }) {

    const [snakeFact, setSnakeFact] = React.useState("Retrieving snake fact...")



    React.useEffect(() => {
        setSnakeFact("Snake Fact: Arizona is home to 13 different species of rattlesnakes.")
    },[])

    React.useEffect(() => {
        fetch("/api/recentScores")
        .then(response => response.json())
        .then((scores) => {
            setRecentScores(scores);
        })
    },[])

    React.useEffect(() => {
        fetch("/api/allTimeScores")
        .then(response => response.json())
        .then((scores) => {
            setAllTimeScores(scores);
        })
    },[])

    const recentScoreRows = []
    const allTimeScoreRows = []

    if (recentScores.length) {
        for (const [i, score] of recentScores.entries()) {
            if (i == 0){
                recentScoreRows.push(
                    <tr>
                        <td className="first-place">{i + 1}</td>
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                        <td>{score.date}</td>
                    </tr>
                )
            }
            else if (i == 1){
                recentScoreRows.push(
                    <tr>
                        <td className="second-place">{i + 1}</td>
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                        <td>{score.date}</td>
                    </tr>
                )
            }
            else {
                recentScoreRows.push(
                    <tr>
                        <td className="third-place">{i + 1}</td>
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                        <td>{score.date}</td>
                    </tr>
                )
            }
        }
    }

    if (allTimeScores.length) {
        for (const [i, score] of allTimeScores.entries()) {
            allTimeScoreRows.push(
                <tr>
                    <td>{i + 1}</td>
                    <td>{score.name}</td>
                    <td>{score.score}</td>
                    <td>{score.date}</td>
                </tr>
            )
        }
    }
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
            {recentScoreRows}
        </tbody>
        </table>
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
            {allTimeScoreRows}
        </tbody>
        </table>
    </main>);
}