export class InputHandler {
    constructor() {
        this.currentKey = null;
        window.addEventListener("keydown", (e) => {
            if ((e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight"
            )) 
            this.currentKey = e.key;
        })
    }
}
