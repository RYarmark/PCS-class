(function () {
    'use strict';
    const crunch = document.getElementById('crunch');
    const crash = document.getElementById('crash');
    const end = document.getElementById('end');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    sizeCanvas();
    const boxSize = 75;
    let direction = 'ArrowRight';
    let score = 0;
    let speed = 1000;
    let gameOver = false;

    document.addEventListener('keydown', e => setDirection(e));
    window.addEventListener('resize', sizeCanvas);
    const snake = new Image();
    snake.src = "media/snake.jpg";
    let mySnake;
    snake.onload = () => {
        mySnake = new Snake();
        setTimeout(play, speed);
    };
    const apple = new Image();
    apple.src = 'media/apple.png';
    let theApple;
    apple.onload = () => { theApple = new Apple(); theApple.move(); };


    class Snake {
        constructor() {
            this.x = 0;
            this.y = 0;
            this.body = [];
            this.draw();
        }

        draw() {
            for (let i = 0; i < this.body.length; i++) {
                context.beginPath();
                context.fillStyle = "#64BB39";
                context.arc(this.body[i].x, this.body[i].y, 30, 0, 2 * Math.PI);
                context.fill();
            }
            context.drawImage(snake, this.x, this.y);

        }
        move() {
            let x = this.x;
            let y = this.y;
            let a = this.x;
            let b = this.y;
            switch (direction) {
                case 'ArrowUp':
                    y -= boxSize;
                    break;
                case 'ArrowRight':
                    x += boxSize;
                    break;
                case 'ArrowDown':
                    y += boxSize;
                    break;
                case 'ArrowLeft':
                    x -= boxSize;
                    break;
            }
            if (x < 0 || x > canvas.width - (canvas.width % boxSize) - boxSize || y < 0 || y > canvas.height - (canvas.height % boxSize) - boxSize) {
                gameOver = true;
                crash.currentTime = 0;
                crash.play();
                // display score
                // save high score
            }
            if (!gameOver) {
                this.x = x;
                this.y = y;
            }
            if (this.x === theApple.x && this.y === theApple.y) {
                score++;
                theApple.move();
                speed -= speed * 0.10;
                crunch.currentTime = 0;
                crunch.play();
                this.body.unshift({ x: a + (boxSize / 2), y: b + (boxSize / 2) });
            }
            else if (this.body.length > 0) {
                this.body.pop();
                this.body.unshift({ x: a + (boxSize / 2), y: b + (boxSize / 2) });
            }
            this.draw();
        }
    }

    class Apple {
        constructor() {
        }
        draw() {

            context.drawImage(apple, this.x, this.y);
        }
        move() {
            this.x = Apple.random(0, canvas.width - (canvas.width % boxSize));
            this.y = Apple.random(0, canvas.height - (canvas.height % boxSize));
            if (placeApple()) {
                context.drawImage(apple, this.x, this.y);
            }
            else {
                this.move();
            }

        }
        static random(min, max) {
            let r = Math.floor(Math.random() * ((max - min) + 1)) + min;
            return r - r % boxSize;
        }
    }

    function sizeCanvas() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }

    function setDirection(e) {
        switch (e.key) {
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowDown':
            case 'ArrowLeft':
                direction = e.key;
                break;
        }
    }

    function play() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        mySnake.move();
        theApple.draw();

        context.font = 'bold 32px Arial';
        context.fillStyle = '#64BB39';
        context.fillText(`Score ${score}`, canvas.width - 160, 40);
        if (!gameOver) {
            setTimeout(play, speed);
        }
        else {
            crash.currentTime = 0;
            crash.play();
            setTimeout(() => end.play(), 500);
            context.font = 'bold 32px Arial';
            context.fillStyle = '#000000';
            context.fillText(`GAME OVER!!!`, (canvas.width / 2) - 70, (canvas.height / 2) - 30);
            context.fillText(`Score: ${score}`, (canvas.width / 2) - 30, (canvas.height / 2) + 20);
        }
    }

    function placeApple() {
        if (mySnake.x === theApple.x && mySnake.y === theApple.y) {
            return false;
        }
        mySnake.body.forEach(part => {
            if (part.x - (boxSize / 2) === theApple.x && part.y - (boxSize / 2) === theApple.y) {
                return false;
            }
        });
        return true;
    }


})();