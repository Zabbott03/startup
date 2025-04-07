import React from 'react';

import './play.css';
import { Game } from "./game"
import { GameEvent, GameNotifier } from './gameNotifier';
import { Players } from "./players.jsx";

export function Play({userName, setRecentScores, setAllTimeScores}) {

    const [isGameRunning, setIsGameRunning] = React.useState(false);
    const [hasGameOver, setHasGameOver] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [players, setPlayers] = React.useState({});
    const [isMultiplayer, setIsMultiplayer] = React.useState(false)

    // if (score > highScore) {
    //   localStorage.setItem("highscore", JSON.stringify(score))
    //   setHighScore(score)
    // }

    async function saveRecentScores(newScore) {
      const date = new Date().toLocaleDateString()
      const response = await fetch("/api/recentScores", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: userName,
          score: newScore,
          date: date
        })
      })
      if (response.status === 200) {
        const data = await response.json();
        setRecentScores(data);
      }
    }

    async function saveAllTimeScores(newScore) {
      const date = new Date().toLocaleDateString()
      const response = await fetch("/api/allTimeScores", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: userName,
          score: newScore,
          date: date
        })
      })
      if (response.status === 200) {
        const data = await response.json();
        setAllTimeScores(data);
      }
    }

    React.useEffect(() => {
      if (hasGameOver && score > 0) {
        saveRecentScores(score);
        saveAllTimeScores(score);
        GameNotifier.broadcastEvent(userName, GameEvent.End, {score})
      }
    }, [hasGameOver, score]);


    const startGame = () => {
        setIsGameRunning(true);
        setHasGameOver(false);
        GameNotifier.broadcastEvent(userName, GameEvent.Start, {});
    }

    const resetGame = () => {
        setIsGameRunning(false);
        setHasGameOver(false);
        setScore(0);
        setPlayers({});
    }

    const multiplayerToggle = () => {
      if (!isGameRunning) {
        setIsMultiplayer(!isMultiplayer)
        setPlayers({})
      }
      return
    }

  return (
    <main>
        <div className="container">
            <div className="score-bar">

                {players["player1"] ? <h4>{userName}: {players["player1"].score} points</h4> :
                <h4>{userName}: 0 points</h4>}

                {players["player2"] && <h4>P2: {players["player2"].score} points</h4>}
                {/* {player3 && <h4>P3: 6 points</h4>} */}
                
            </div>
            <div>
              <Players userName={userName}/>
            </div>
            <div className="canvas-gameover">
              {/* <div className="canvas-placeholder"> */}
                <Game 
                  isGameRunning={isGameRunning} 
                  setHasGameOver={setHasGameOver} 
                  hasGameOver={hasGameOver} 
                  setScore={setScore} 
                  setPlayers={setPlayers}
                  players={players}
                  isMultiplayer={isMultiplayer}
                  />
              {/* </div> */}

              {hasGameOver && <div className="game-over">Game Over!</div>}

            </div>

            {/* {hasGameOver && <div className="game-over">Game Over!</div>} */}

            <div>
              <button className="start-btn" onClick={startGame} disabled={isGameRunning}>Start Game</button>
              <button className="end-btn" onClick={resetGame} >Reset</button>
            </div>
            <div className="multiplayer-toggle-div">
              <label htmlFor="multiplayer-toggle" className="multiplayer-label">Toggle Multiplayer</label>
              <input type="checkbox" checked={isMultiplayer} onChange={multiplayerToggle} disabled={isGameRunning} id="multiplayer-toggle" />
            </div>
        </div>
    </main>);
}
