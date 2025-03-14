import React from 'react';

import './leaderboard.css';

const API_KEY = import.meta.env.VITE_API_SNAKE_KEY;

export function Leaderboard({ recentScores, allTimeScores, setRecentScores, setAllTimeScores }) {

    const [snakeFact, setSnakeFact] = React.useState("Retrieving snake fact...")
    const [displayHighScoreboard, setDisplayHighScoreboard] = React.useState(false)


    const toggleScoreboard = () => {
        setDisplayHighScoreboard(!displayHighScoreboard)
        console.log("toggled")
        return;
    }


    React.useEffect( () => {
        const getSnakeFact = async () => {
        const response = await fetch("https://api.api-ninjas.com/v1/animals?name=rattlesnake", {
            headers: {
                "X-Api-Key" : API_KEY
            }
        })

        if (!response.ok) {
            setSnakeFact("Failed to retrieve snake fact.")
            return;
        }

        const data = await response.json();

        const specificSnakes = data.filter(snake => 
            snake.characteristics &&
            snake.characteristics.length != undefined &&
            snake.characteristics.length != null
        )
        if (specificSnakes.length > 0) {
            const randomSnake = specificSnakes[Math.floor(Math.random() * specificSnakes.length)]

            setSnakeFact(`The ${randomSnake.name} grows to a length of ${randomSnake.characteristics.length}, and has the scientific name of ${randomSnake.taxonomy.scientific_name}.`)
        }
        else {
            setSnakeFact("Failed to retrieve snake fact.")
        }
    }   
    getSnakeFact();

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

    if (allTimeScores.length) {
        for (const [i, score] of allTimeScores.entries()) {
            if (i == 0){
                allTimeScoreRows.push(
                    <tr>
                        <td className="first-place">{i + 1}</td>
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                        <td>{score.date}</td>
                    </tr>
                )
            }
            else if (i == 1){
                allTimeScoreRows.push(
                    <tr>
                        <td className="second-place">{i + 1}</td>
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                        <td>{score.date}</td>
                    </tr>
                )
            }
            else if (i == 2){
                allTimeScoreRows.push(
                    <tr>
                        <td className="third-place">{i + 1}</td>
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                        <td>{score.date}</td>
                    </tr>
                )
            }
            else {
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
    } else {
        allTimeScoreRows.push(
            <tr>
                <td colSpan="4">Be the first to score!</td>
            </tr>
        )
    }

    if (recentScores.length) {
        for (const [i, score] of recentScores.entries()) {
            recentScoreRows.push(
                <tr>
                    {/* <td>{i + 1}</td> */}
                    <td>{score.name}</td>
                    <td>{score.score}</td>
                    <td>{score.date}</td>
                </tr>
            )
        }
    } else {
        recentScoreRows.push(
            <tr>
                <td colSpan="4">Be the first to score!</td>
            </tr>
        )
    }
    
  return (
    <main>
        <div className="snake-fact-toggle">
            <h4 className="snake-fact">{snakeFact}</h4>
            <div className="toggle-box">
            <label htmlFor="scores-toggle" className="scores-label">Toggle Scoreboard</label>
            <input type="checkbox" id="scores-toggle" checked={displayHighScoreboard} onChange={toggleScoreboard}/>
            </div>
        </div>
        {!displayHighScoreboard && (
        <div className="outer-leaderboard">
            <h2>Recent Scores</h2>
            <table className="leaderboard">
                <thead>
                <tr>
                    {/* <th>Rank</th> */}
                    <th>Player</th>
                    <th>Score</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                    {recentScoreRows}
                </tbody>
            </table>
        </div>)}
        {displayHighScoreboard && (
        <div className="outer-leaderboard">
        <h2>
            All Time High Scores
        </h2>
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
        </div>)}
    </main>);
}