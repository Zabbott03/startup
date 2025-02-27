export function drawFruit(canvas, ctx, board, fruit) {
    ctx.beginPath();
    ctx.rect(
      (fruit.x * canvas.width / board.columns) + 8,
      (fruit.y * canvas.height / board.rows) + 8,
      (canvas.width / board.columns) - 16,
      (canvas.height / board.rows) - 16
    )
    ctx.fillStyle = "red";
    ctx.fill();
  }

  export function generateFruit(board, snake) {
    const x = Math.floor(Math.random() * board.columns);
    const y = Math.floor(Math.random() * board.rows);
    if (snake.checkCollision(x,y)) {
        return generateFruit(board,snake);
    }
    return { x, y };
  }