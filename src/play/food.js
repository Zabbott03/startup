export function drawFruit(canvas, ctx, board, fruit) {
    ctx.beginPath();
    ctx.rect(
      (fruit.x * canvas.width / board.columns) + 5,
      (fruit.y * canvas.height / board.rows) + 5,
      (canvas.width / board.columns) - 10,
      (canvas.height / board.rows) - 10
    )
    ctx.fillStyle = "red";
    ctx.fill();
  }

  export function generateFruit(board) {
    const x = Math.floor(Math.random() * board.columns);
    const y = Math.floor(Math.random() * board.rows);
    return { x, y };
  }