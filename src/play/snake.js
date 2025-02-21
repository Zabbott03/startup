export class Snake {
    constructor(x,y,color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.direction = "right";
      this.body = [{ x, y }];
      this.positions = new Set();
      this.positions.add(`${x},${y}`);
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
      if (input.currentKey === ("ArrowUp") && this.direction != "down") this.direction = "up";
      else if (input.currentKey === ("ArrowDown") && this.direction != "up") this.direction = "down";
      else if (input.currentKey === ("ArrowLeft") && this.direction != "right") this.direction = "left";
      else if (input.currentKey === ("ArrowRight") && this.direction != "left") this.direction = "right";
    }

    move() {
      let newX = this.x;
      let newY = this.y;

      if (this.direction === "up") {
        newY--;
      }
      else if (this.direction === "down") {
        newY++;
      }
      else if (this.direction === "left") {
        newX--;
      }
      else if (this.direction === "right") {
        newX++;
      }
      
      if (!this.checkCollision(newX,newY)) {
        this.positions.delete(`${this.x},${this.y}`);
        this.body.shift();
        this.x = newX;
        this.y = newY;
        this.body.push({ x: this.x, y: this.y });
        this.positions.add(`${this.x},${this.y}`);
      } else {
        return true;
      }
      
    }

    grow() {

    }

    checkCollision(x, y) {

      const outOfBounds = x < 0 || x >= 17 || y < 0 || y >= 15;
      return this.positions.has(`${x},${y}`) || outOfBounds;

    }

  }