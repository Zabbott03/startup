import { Snake } from "./snake";

export class SnakeList {
    constructor() {
        this.snakes = {};
    }

    addSnake(playerId, x, y, color) {
        this.snakes[playerId] = new Snake(x, y, color);
        return this.snakes[playerId];
    }

    updateAll(inputs) {
        Object.keys(this.snakes).forEach(playerId => {
            if(inputs[playerId]) {
                this.snakes[playerId].update(inputs[playerId]);
            }
        })
    }

    moveAll() {
        const collisions = [];

        Object.keys(this.snakes).forEach(playerId => {
            const snake = this.snakes[playerId];
            const head = {x : snake.x, y : snake.y};

            let newX = head.x;
            let newY = head.y;

            if (snake.direction == "up") newY--;
            else if (snake.direction == "down") newY++;
            else if (snake.direction == "right") newX++;
            else if (snake.direction == "left") newX--;

            Object.keys(this.snakes).forEach(otherPlayerId => {
                if (playerId != otherPlayerId) {
                    const otherSnake = this.snakes[otherPlayerId];
                    if (otherSnake.positions.has(`${newX}, ${newY}`)) {
                        collisions.push(playerId);
                    }
                }
            })
        })
        Object.keys(this.snakes).forEach(playerId => {
            if (!collisions.includes(playerId)) {
                if (this.snakes[playerId].move()){
                    collisions.push(playerId)
                }

            }
        })
        
        return collisions
    }

}