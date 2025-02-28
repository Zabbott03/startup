import React from 'react';
import { useRef, useEffect } from 'react';

import './play.css';
import { InputHandler, InputHandler2 } from "./input";
import { drawFruit } from "./fruit";
import { generateFruit } from "./fruit";
import { SnakeList } from "./snakeList";
import { drawGameBoard } from "./gameboard";


export function Game({ isGameRunning, setHasGameOver, hasGameOver, setScore, players, setPlayers, isMultiplayer }) {
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

      if (Object.keys(players).length === 0) {
        snakeListRef.current = new SnakeList();
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      drawGameBoard(canvas,ctx,board);

      if (Object.keys(players).length === 0) {

        const currentPlayers = {
          player1: {x: 3, y: 7, color: "blue", score: 0},
        }

        if (isMultiplayer) {
          currentPlayers["player2"] = {x: 13, y: 7, color: "red", score:0}
        }

        Object.keys(currentPlayers).forEach(playerId => {
          const player = currentPlayers[playerId]
          snakeListRef.current.addSnake(
            playerId,
            player.x,
            player.y,
            player.color
          )

        })
        setPlayers(currentPlayers)

        if (isMultiplayer) {
        snakeListRef.current.snakes["player2"].direction = "left";
        }

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
        };

        if (isMultiplayer) {
          inputs["player2"] = new InputHandler2()
        }

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
                  setScore(players[playerId].score);
                })

                localFruit = generateFruit(board, snakeListRef.current.snakes);
                setFruit(localFruit)
              }
              
              snakeListRef.current.drawAll(canvas,ctx,board);

              drawFruit(canvas,ctx,board,localFruit);
              
          }, 150);

        return () => clearInterval(interval);
      }
    },[isGameRunning, hasGameOver, isMultiplayer, players]);
    

  
    return <canvas className="canvas-placeholder" ref={canvasRef} width="643" height="567" />;
}