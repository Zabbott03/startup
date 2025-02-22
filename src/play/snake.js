export class Snake {
    constructor(x,y,color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.direction = "right";
      this.body = [{ x, y }];
      this.positions = new Set();
      this.positions.add(`${x},${y}`);
      this.lastTail = null;
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

    // update2(input){
    //   if (input.currentKey === ("w") && this.direction != "down") this.direction = "up";
    //   else if (input.currentKey === ("s") && this.direction != "up") this.direction = "down";
    //   else if (input.currentKey === ("a") && this.direction != "right") this.direction = "left";
    //   else if (input.currentKey === ("d") && this.direction != "left") this.direction = "right";
    // }

    move() {
      let newX = this.x;
      let newY = this.y;

      if (this.direction === "up" || this.direction === "w") {
        newY--;
      }
      else if (this.direction === "down" || this.direction == "s") {
        newY++;
      }
      else if (this.direction === "left" || this.direction == "a") {
        newX--;
      }
      else if (this.direction === "right" || this.direction == "d") {
        newX++;
      }
      
      if (!this.checkCollision(newX,newY)) {
        const tail = this.body[0];

        this.positions.delete(`${this.x},${this.y}`);
        this.body.shift();
        this.x = newX;
        this.y = newY;
        this.body.push({ x: this.x, y: this.y });
        this.positions.add(`${this.x},${this.y}`);

        this.lastTail = tail;
      } else {
        return true;
      }
    }

    grow() {
      // if (this.lastTail) {
      //   this.body.unshift(this.lastTail);
      //   this.positions.add(`${this.lastTail.x},${this.lastTail.y}`);
      //   this.lastTail = null;
      // }
    }

    checkCollision(x, y) {

      const outOfBounds = x < 0 || x >= 17 || y < 0 || y >= 15;
      return this.positions.has(`${x},${y}`) || outOfBounds;

    }

  }