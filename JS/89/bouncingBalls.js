(function () {
    'use strict';


    const colorPicker = document.getElementById('color');
    const setRadius = document.getElementById('radius');
    const newBall = document.getElementById('new');
    const balls = [];
    let color = colorPicker.value;
    let radius = setRadius.value;

    colorPicker.addEventListener('change', () => color = colorPicker.value);

    newBall.addEventListener('click', () => {
        color = colorPicker.value;
        radius = setRadius.value;
        const myBall = new Ball(color, radius);
        balls.push(myBall);
    });
    setInterval(() => balls.forEach(ball => { ball.draw(ball); }, 200)
    );
    class Ball {
        constructor(color, radius) {
            this.color = color;
            this.radius = radius;
            this.x = Number(radius);
            this.y = Number(radius);
            this.dx = 10;
            this.dy = 10;
            this.context = createCanvas();
        }

        draw(ball) {

            drawBouncingBall(ball);

            if (ball.x < radius || ball.x > window.innerWidth - radius) {
                ball.dx = -ball.dx;
            }

            if (ball.y < radius || ball.y > window.innerHeight - radius) {
                ball.dy = -(ball.dy);
            }
            ball.x += ball.dx;
            ball.y += ball.dy;
        }
    }

    function createCanvas() {
        const myCanvas = document.createElement('canvas');
        myCanvas.id = 'canvas';
        myCanvas.width = window.innerWidth;
        myCanvas.height = window.innerHeight;
        const context = myCanvas.getContext('2d');
        document.body.append(myCanvas);

        window.addEventListener('resize', () => {
            myCanvas.width = window.innerWidth;
            myCanvas.height = window.innerHeight;
        });

        return context;
    }

    function drawBouncingBall(ball) {
        ball.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ball.context.beginPath();
        ball.context.fillStyle = `${ball.color}`;
        ball.context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
        ball.context.fill();

    }
})();