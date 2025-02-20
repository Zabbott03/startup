import React from 'react';
import { useRef, useEffect } from 'react';

import './play.css';

// function gameBoard() {
//     let board = [];
//     for (let i = 0; i < 255; i++) {
//         board.push(<div class='square'></div>);
//     }
//     return board;
// }

class Snake {
    constructor(x,y,color) {
      this.x = x;
      this.y = y;
      this.color = color;
      let dx = 20;
      let dy = 0;
    }
    draw(canvas, ctx, board) {
      ctx.beginPath();
      ctx.rect(
        (this.x * canvas.width / board.columns) + 4,
        (this.y * canvas.height / board.rows) + 4,
        (canvas.width / board.columns) - 8,
        (canvas.height / board.rows) - 8
      )
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    update(){
      this.x += dx;
      this.y += dy;
    }
  }


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

function Canvas() {
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
      let x = Math.floor(Math.random() * board.columns);
      let y = Math.floor(Math.random() * board.rows);
      let player1 = new Snake(x,y,"blue");
      player1.draw(canvas,ctx,board);
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
            <Canvas />

            </div>
            <div>
            <button className="start-btn">Start Game</button>
            <button className="end-btn">End Game</button>
            </div>
        </div>
    </main>);
}