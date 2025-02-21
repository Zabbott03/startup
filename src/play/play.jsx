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

function Game({ isGameRunning, setHasGameOver, hasGameOver }) {
    const canvasRef = useRef(null);
    const [fruit, setFruit] = React.useState(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const board = {
        rows: 15,
        columns: 17,
        colors: {
          light: '#abdaab',
          dark: '#98d098'
        }
      }

      drawGameBoard(canvas,ctx,board);

      const x = 3;
      const y = 7;
      const player1 = new Snake(x,y,"blue");

      if (!fruit) {
        setFruit(generateFruit(board, player1));
      }
      
      if (isGameRunning && !hasGameOver) {
        
        player1.draw(canvas,ctx,board);
        drawFruit(canvas,ctx,board,fruit);

        const input = new InputHandler();

          const interval = setInterval(() => {

              ctx.clearRect(0,0,canvas.width,canvas.height);
              drawGameBoard(canvas,ctx,board);
              player1.update(input);
              
              if (player1.move()) {
                setHasGameOver(true);
              }
              drawFruit(canvas,ctx,board,fruit);
              player1.draw(canvas,ctx,board);
          
          }, 150);

        return () => clearInterval(interval);
      }
    },[isGameRunning]);
    

  
    return <canvas ref={canvasRef} width="643" height="567" />;
}


export function Play() {
    const [isGameRunning, setIsGameRunning] = React.useState(false);
    const [hasGameOver, setHasGameOver] = React.useState(false);
    const startGame = () => {
        setIsGameRunning(true);
        setHasGameOver(false);
    }
    const resetGame = () => {
        setIsGameRunning(false);
        setHasGameOver(false);
    }
  return (
    <main>
        <div className="container">
            <div className="score-bar">
                <h4>P1: 11 points</h4>
                <h4>P2: 12 points</h4>
                <h4>P3: 6 points</h4>
            </div>
            <div className="canvas-placeholder">
            <Game isGameRunning={isGameRunning} setHasGameOver={setHasGameOver} hasGameOver={hasGameOver}/>

            </div>
            {hasGameOver && <div className="game-over">Game Over!</div>}

            <div>
            <button className="start-btn" onClick={startGame}>Start Game</button>
            <button className="end-btn" onClick={resetGame}>Reset</button>
            </div>
        </div>
    </main>);
}
