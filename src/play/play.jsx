import React from 'react';
import { useRef, useEffect } from 'react';

import './play.css';
import { Snake } from "./snake";
import { InputHandler } from "./input";


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

function Game() {
    const canvasRef = useRef(null);
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

      const x = Math.floor(Math.random() * board.columns);
      const y = Math.floor(Math.random() * board.rows);
      const player1 = new Snake(x,y,"blue");
    
      player1.draw(canvas,ctx,board);

      const input = new InputHandler();

      const interval = setInterval(() => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawGameBoard(canvas,ctx,board);
        player1.update(input);
        player1.move();
        player1.draw(canvas,ctx,board);

      }, 150);

      return () => clearInterval(interval);

    },[]);

  
      return <canvas ref={canvasRef} width="643" height="567" />;
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
            <Game />

            </div>
            <div>
            <button className="start-btn">Start Game</button>
            <button className="end-btn">End Game</button>
            </div>
        </div>
    </main>);
}