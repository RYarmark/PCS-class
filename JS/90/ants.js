(function () {
    'use strict';

    const context = createCanvas();
    let color = document.getElementById('color');
    let amount = document.getElementById('amount');
    let add = document.getElementById('addAnts');
    const size = document.getElementById('size');
    let antSize;
    let ants = [];


    add.addEventListener('click', () => {
        for (let i = 0; i < Number(amount.value); i++) {
            ants.push(new Ant());
        }
    });


    size.onchange = (() => antSize = Number(size.value));
    setInterval(() => {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ants.forEach(a => a.move());
    }, 100);

    function changePic() {
        let i = 1;
        let j = 1;
        setInterval(() => {
            document.getElementById('apple').src = `images/apple${i++}.png`;
            if (i > 4) {
                i = 1;
            }
        }, 5500);
        setInterval(() => {
            document.getElementById('cookie').src = `images/cookie${j++}.png`;
            if (j > 4) {
                j = 1;
            }
        }, 4500);
    }
    setTimeout(changePic, 5000);
    class Ant {

        constructor() {
            this.size = Number(size.value);
            this.color = color.value;
            this.randNum = Ant.getRandNum(10, 20);
            this.target = Ant.getRandNum(1, 2);
            this.randX = Ant.getRandNum(-2, 2);
            this.randY = Ant.getRandNum(-2, 2);

            if (window.innerWidth > 800) {
                this.x = window.innerWidth / 2;
                this.y = window.innerHeight / 4 * 3 - 10;
            }
            else {
                this.x = window.innerWidth / 3 * 2;
                this.y = window.innerHeight / 2;
            }
        }


        draw() {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size * 2, this.size);
        }

        move() {
            if (this.randNum === 1) {
                this.randNum = Ant.getRandNum(10, 30);
                this.randX = Ant.getRandNum(-4, 2);
                this.randY = Ant.getRandNum(-4, 2);
            }
            this.x += this.randX;
            this.y += this.randY;
            if (this.x < 4) {
                this.x = 0;
            }
            else if (this.x > window.innerWidth - 10) {
                this.x = window.innerWidth - 10;
            }
            if (this.y < 2) {
                this.y = 0;
            }
            else if (this.y > window.innerHeight - 6) {
                this.y = window.innerHeight - 6;
            }
            this.draw();
            this.randNum--;
        }

        static getRandNum(min, max) {
            return Math.floor(Math.random() * ((max - min) + 1) + min);
        }
    }

    function createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.display = 'block';
        const context = canvas.getContext('2d');
        document.body.append(canvas);
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        return (context);
    }
})();