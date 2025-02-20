export class Snake {
    constructor(x,y,color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.dx = 0;
      this.dy = 0;
      this.direction = null;
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
    update(input){
      if (input.keys.includes("ArrowUp")) this.direction = "up";
      else if (input.keys.includes("ArrowDown")) this.direction = "down";
      else if (input.keys.includes("ArrowLeft")) this.direction = "left";
      else if (input.keys.includes("ArrowRight")) this.direction = "right";
    }

    move() {
      if (this.direction === "up") this.y--;
      else if (this.direction === "down") this.y++;
      else if (this.direction === "left") this.x--;
      else if (this.direction === "right") this.x++;
    }
  }