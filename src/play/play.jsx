import React from 'react';
import { useRef, useEffect } from 'react';

import './play.css';
import { Snake } from "./snake";
import { InputHandler } from "./input";
import { drawFruit } from "./food";
import { generateFruit } from "./food";


function drawGameBoard(canvas,ctx,board) {
    ctx.beginPath();
      ctx.fillStyle = board.colors.dark;
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fill();
      
      ctx.beginPath();
      ctx.fillStyle = board.colors.light;
      for (let column = 0; column < board.columns; column++) {
        for (let row = 0; row < board.rows; row++) {
          if (row % 2 === 0 && column % 2 === 1 || row % 2 === 1 && column % 2 === 0) {
            ctx.rect(
              column * canvas.width / board.columns,
              row * canvas.height / board.rows,
              canvas.width / board.columns,
              canvas.height / board.rows
            );
          }
        }
      }
      ctx.fill();
}



function Game({ isGameRunning, setHasGameOver, hasGameOver, setScore, setPlayer1, player1 }) {
    const canvasRef = useRef(null);
    const [fruit, setFruit] = React.useState(null);
    const [isEaten, setIsEaten] = React.useState(false);
    const snakeRef = useRef(null);
    const board = {
      rows: 15,
      columns: 17,
      colors: {
        light: '#abdaab',
        dark: '#98d098'
      }
    }

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      drawGameBoard(canvas,ctx,board);

      
      const x = 3;
      const y = 7;
      
      if (!player1) {
        const newSnake = new Snake(x,y,"blue");
        setPlayer1(newSnake);
        snakeRef.current = newSnake;
      }
      else {
        snakeRef.current = player1;
      }


      if (!fruit) {
        setFruit(generateFruit(board, snakeRef.current));
      }

      let localFruit = fruit;
      
      if (isGameRunning && !hasGameOver) {
        
        snakeRef.current.draw(canvas,ctx,board);

        drawFruit(canvas,ctx,board,fruit);

        const input = new InputHandler();

          const interval = setInterval(() => {

              ctx.clearRect(0,0,canvas.width,canvas.height);
              drawGameBoard(canvas,ctx,board);
              snakeRef.current.update(input);

              if (snakeRef.current.move()) {
                setHasGameOver(true);
              }

              if (snakeRef.current.checkCollision(localFruit.x,localFruit.y)) {
                localFruit = generateFruit(board,snakeRef.current);
                setIsEaten(true);
                setFruit(generateFruit(board,snakeRef.current));
                snakeRef.current.grow();
                setScore(snakeRef.current.score)

              }


              drawFruit(canvas,ctx,board,localFruit);
              snakeRef.current.draw(canvas,ctx,board);
          
          }, 150);

        return () => clearInterval(interval);
      }
    },[isGameRunning, hasGameOver]);
    

  
    return <canvas ref={canvasRef} width="643" height="567" />;
}


export function Play() {
    const [isGameRunning, setIsGameRunning] = React.useState(false);
    const [hasGameOver, setHasGameOver] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [player1, setPlayer1] = React.useState(null);
    const [player2, setPlayer2] = React.useState(null);
    const [player3, setPlayer3] = React.useState(null);

    const startGame = () => {
        setIsGameRunning(true);
        setHasGameOver(false);
    }
    const resetGame = () => {
        setIsGameRunning(false);
        setHasGameOver(false);
        setScore(0);
    }
  return (
    <main>
        <div className="container">
            <div className="score-bar">
                {player1 && <h4>P1: {score} points</h4>}
                {player2 && <h4>P2: 12 points</h4>}
                {player3 && <h4>P3: 6 points</h4>}
            </div>
            <div className="canvas-placeholder">
            <Game 
            isGameRunning={isGameRunning} 
            setHasGameOver={setHasGameOver} 
            hasGameOver={hasGameOver} 
            setScore={setScore} 
            setPlayer1={setPlayer1}
            player1={player1}/>

            </div>
            {hasGameOver && <div className="game-over">Game Over!</div>}

            <div>
            <button className="start-btn" onClick={startGame}>Start Game</button>
            <button className="end-btn" onClick={resetGame}>Reset</button>
            </div>
        </div>
    </main>);
}
