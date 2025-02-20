export class Snake {
    constructor(x,y,color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.dx = 1;
      this.dy = 0;
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
      this.x += this.dx;
      this.y += this.dy;
    }
  }