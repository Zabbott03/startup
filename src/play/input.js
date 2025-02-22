export class InputHandler {
    constructor() {
        this.currentKey = null;
        window.addEventListener("keydown", (e) => {
            if ((e.key === "ArrowUp" ||
                e.key === "ArrowDown" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight"
                // e.key === "w" ||
                // e.key === "a" ||
                // e.key === "s" ||
                // e.key === "d"
            )) 
            this.currentKey = e.key;
        })
    }
}
