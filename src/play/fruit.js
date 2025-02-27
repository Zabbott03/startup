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

export function generateFruit(board, snakes) {
  let x,y;
  let isValidPosition = false

  const occupiedPositions = new Set();
  Object.values(snakes).forEach(snake => {
    snake.positions.forEach(position => {
      occupiedPositions.add(position)
    })
  })
  while (!isValidPosition) {
    x = Math.floor(Math.random() * board.columns);
    y = Math.floor(Math.random() * board.rows);
    if (!occupiedPositions.has(`${x},${y}`)) {
      isValidPosition = true
    }
  }
  return { x, y };
}