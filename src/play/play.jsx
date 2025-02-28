import React from 'react';

import './play.css';
import { Game } from "./game"

export function Play({userName, highScore, setHighScore}) {

    const [isGameRunning, setIsGameRunning] = React.useState(false);
    const [hasGameOver, setHasGameOver] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [players, setPlayers] = React.useState({});
    const [isMultiplayer, setIsMultiplayer] = React.useState(false)

    if (score > highScore) {
      localStorage.setItem("highscore", JSON.stringify(score))
      setHighScore(score)
    }

    const startGame = () => {
        setIsGameRunning(true);
        setHasGameOver(false);
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
