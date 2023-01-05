export default class Apple {
    constructor() {
    }
    draw(apple, context) {
        context.drawImage(apple, this.x, this.y);
    }
    move(canvas, boxSize, apple, mySnake, context) {
        this.x = Apple.random(0, canvas.width - (canvas.width % boxSize), boxSize);
        this.y = Apple.random(0, canvas.height - (canvas.height % boxSize), boxSize);
        let good = true;
        if (mySnake.x !== this.x || mySnake.y !== this.y) {
            mySnake.body.forEach(part => {
                if (part.x - (boxSize / 2) === this.x && part.y - (boxSize / 2) === this.y) {
                    good = false;
                }
            });
        }
        else {
            good = false;
        }
        if (good) {
            context.drawImage(apple, this.x, this.y);
        }
        else {
            this.move(canvas, boxSize, apple, mySnake);
        }

    }
    static random(min, max, boxSize) {
        let r = Math.floor(Math.random() * ((max - min) + 1)) + min;
        return r - r % boxSize;
    }
}

