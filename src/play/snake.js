export class Snake {
    constructor(x,y,color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.direction = "right";
      this.body = [{ x, y }];
      this.positions = new Set();
      this.positions.add(`${x},${y}`);
      this.shouldGrow = false;
      this.score = 0;
    }
    
    draw(canvas, ctx, board) {
      this.body.forEach(segment => {
        ctx.beginPath();
        ctx.rect(
          (segment.x * canvas.width / board.columns) + 4,
          (segment.y * canvas.height / board.rows) + 4,
          (canvas.width / board.columns) - 8,
          (canvas.height / board.rows) - 8
        )
        ctx.fillStyle = this.color;
        ctx.fill();
      })
    }

    update(input){
      if (input.currentKey === ("ArrowUp") && this.direction != "down") this.direction = "up";
      else if (input.currentKey === ("ArrowDown") && this.direction != "up") this.direction = "down";
      else if (input.currentKey === ("ArrowLeft") && this.direction != "right") this.direction = "left";
      else if (input.currentKey === ("ArrowRight") && this.direction != "left") this.direction = "right";
      else if (input.currentKey === ("w") && this.direction != "down") this.direction = "up";
      else if (input.currentKey === ("s") && this.direction != "up") this.direction = "down";
      else if (input.currentKey === ("a") && this.direction != "right") this.direction = "left";
      else if (input.currentKey === ("d") && this.direction != "left") this.direction = "right";
    }

    inverseUpdate(input){
      if (input.currentKey === ("ArrowUp") && this.direction != "up") this.direction = "down";
      else if (input.currentKey === ("ArrowDown") && this.direction != "down") this.direction = "up";
      else if (input.currentKey === ("ArrowLeft") && this.direction != "left") this.direction = "right";
      else if (input.currentKey === ("ArrowRight") && this.direction != "right") this.direction = "left";
    }

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

        if (!this.shouldGrow) {
          const tail = this.body[this.body.length - 1];
          this.positions.delete(`${tail.x},${tail.y}`);
        } else {
          this.shouldGrow = false;
        }
        

          for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i] = { ...this.body[i - 1] };
          }

        this.body[0] = { x: newX, y: newY};
        this.x = newX;
        this.y = newY;
        this.positions.add(`${newX},${newY}`);

        
        return false;
      } 
      else {
        return true;
      }

    }

    grow() {
      this.shouldGrow = true;
      const tail = this.body[this.body.length - 1];
      this.body.push({ ...tail});
      this.score += 1;
    }

    reverseGrow() {

      if (this.body.length == 1) {
        const tail = this.body[this.body.length - 1];
        this.body.push({ ...tail});
        this.score += 1;
      }

      else {
      this.shouldGrow = true;
      
      // Get the tail and second-to-last segment to determine tail direction
      const tail = this.body[this.body.length - 1];
      const secondToLast = this.body[this.body.length - 2];
      
      // Determine the direction the tail is moving
      let tailDirection;
      if (tail.x < secondToLast.x) tailDirection = "left";
      else if (tail.x > secondToLast.x) tailDirection = "right";
      else if (tail.y < secondToLast.y) tailDirection = "up";
      else if (tail.y > secondToLast.y) tailDirection = "down";
      
      // Reverse the body
      this.body.reverse();
      
      // Update the head position
      this.x = this.body[0].x;
      this.y = this.body[0].y;
      
      // Set the new direction based on the original tail's direction
      this.direction = tailDirection;
      
      // Add the new segment at the new head (formerly tail)
      const head = this.body[0];
      this.body.push({ ...head });
      
      // Update the score
      this.score += 1;
      
      // Rebuild the positions Set since the body order has changed
      this.positions.clear();
      this.body.forEach(segment => {
        this.positions.add(`${segment.x},${segment.y}`);
      });
    }
    }

    checkCollision(x, y) {

      const outOfBounds = x < 0 || x >= 17 || y < 0 || y >= 15;
      return this.positions.has(`${x},${y}`) || outOfBounds;

    }
  

  }