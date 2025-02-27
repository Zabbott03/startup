import React from 'react';
import { useRef, useEffect } from 'react';

import './play.css';
import { InputHandler } from "./input";
import { drawFruit } from "./fruit";
import { generateFruit } from "./fruit";
import { SnakeList } from "./snakeList";
import { drawGameBoard } from "./gameboard";


function Game({ isGameRunning, setHasGameOver, hasGameOver, setScore, players, setPlayers }) {
    const canvasRef = useRef(null);
    const [fruit, setFruit] = React.useState(null);
    const snakeListRef = useRef(null);
    const board = {
      rows: 15,
      columns: 17,
      colors: {
        light: '#abdaab',
        dark: '#98d098'
      }
    }

    useEffect(() => {

      if (!snakeListRef.current) {
        snakeListRef.current = new SnakeList();
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      drawGameBoard(canvas,ctx,board);

      if (Object.keys(players).length === 0) {

        const currentPlayers = {
          player1: {x: 5, y: 7, color: "blue", score: 0}
          // player2: {x: 13, y: 7, color: "red", score:0}
        }

        Object.keys(currentPlayers).forEach(playerId => {
          const player = currentPlayers[playerId]
          const snake = snakeListRef.current.addSnake(
            playerId,
            player.x,
            player.y,
            player.color
          )
        })
        setPlayers(currentPlayers)
      }

      if (!fruit) {
        setFruit(generateFruit(board, snakeListRef.current.snakes));
      }

      let localFruit = fruit;
      
      if (isGameRunning && !hasGameOver) {
        
        snakeListRef.current.drawAll(canvas,ctx,board);

        drawFruit(canvas,ctx,board,fruit);

        const inputs = {
          player1: new InputHandler()
          // player2: new InputHandler()
        };

          const interval = setInterval(() => {

              ctx.clearRect(0,0,canvas.width,canvas.height);
              drawGameBoard(canvas,ctx,board);
              
              snakeListRef.current.updateAll(inputs);

              const collisions = snakeListRef.current.moveAll()

              if (collisions.length > 0) {
                setHasGameOver(true);
              }

              const fruitCollisions = snakeListRef.current.checkFruitCollisions(localFruit)

              if (fruitCollisions.length > 0) {

                fruitCollisions.forEach(playerId => {
                  snakeListRef.current.snakes[playerId].grow();
                  const updatedPlayers = { ...players}
                  updatedPlayers[playerId].score = snakeListRef.current.snakes[playerId].score;
                  setPlayers(updatedPlayers)
                })

                localFruit = generateFruit(board, snakeListRef.current.snakes);
                setFruit(localFruit)
              }
              
              snakeListRef.current.drawAll(canvas,ctx,board);

              drawFruit(canvas,ctx,board,localFruit);
              
          }, 150);

        return () => clearInterval(interval);
      }
    },[isGameRunning, hasGameOver]);
    

  
    return <canvas ref={canvasRef} width="643" height="567" />;
}


export function Play({userName, highScore, setHighScore}) {
    const [isGameRunning, setIsGameRunning] = React.useState(false);
    const [hasGameOver, setHasGameOver] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [players, setPlayers] = React.useState({});

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
  return (
    <main>
        <div className="container">
            <div className="score-bar">
                {players && <h4>{userName}: {score} points</h4>}
                {players && <h4>P2: 12 points</h4>}
                {/* {player3 && <h4>P3: 6 points</h4>} */}
            </div>
            <div className="canvas-placeholder">
            <Game 
            isGameRunning={isGameRunning} 
            setHasGameOver={setHasGameOver} 
            hasGameOver={hasGameOver} 
            setScore={setScore} 
            setPlayers={setPlayers}
            players={players}/>

            </div>
            {hasGameOver && <div className="game-over">Game Over!</div>}

            <div>
            <button className="start-btn" onClick={startGame}>Start Game</button>
            <button className="end-btn" onClick={resetGame} disabled={!hasGameOver}>Reset</button>
            </div>
        </div>
    </main>);
}
