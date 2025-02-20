export class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener("keydown", (e) => {
            console.log(e.key)
            if ((e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight"
            ) && !this.keys.includes(e.key)) this.keys.push(e.key);
            console.log(this.keys);
        })
        window.addEventListener("keyup", (e) => {
            if (this.keys.includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        })
    }
}
