(function () {
    'use strict';

    let colorChange;

    function changeColor() {

        const color = document.body.style.color = 'rgb(' + getRGB() + ', ' + getRGB() + ', ' + getRGB() + ')';
        const backColor = document.body.style.backgroundColor = 'rgb(' + getRGB() + ', ' + getRGB() + ', ' + getRGB() + ')';

        const newRow = document.getElementById('colors').insertRow();
        const cell1 = newRow.insertCell();
        const Cell2 = newRow.insertCell();
        const Cell3 = newRow.insertCell();

        cell1.innerHTML = (myTimer().toLocaleTimeString());
        Cell2.style.backgroundColor = backColor;
        Cell3.style.backgroundColor = color;

        newRow.addEventListener('click', () => {
            stop();
            document.body.style.color = Cell3.style.backgroundColor;
            document.body.style.backgroundColor = Cell2.style.backgroundColor;

        });
    }

    function getRGB() {
        return Math.floor(Math.random() * 256);
    }

    function start() {
        changeColor();
        colorChange = setInterval(changeColor, 1500);
    }

    function stop() {
        clearInterval(colorChange);
    }

    document.getElementById('start').addEventListener('click', start);
    document.getElementById('stop').addEventListener('click', stop);

    function myTimer() {
        const d = new Date();
        return d;
    }

    //first row
    const newRow = document.getElementById('colors').insertRow();
    const cell1 = newRow.insertCell();
    const Cell2 = newRow.insertCell();
    const Cell3 = newRow.insertCell();

    cell1.innerHTML = (myTimer().toLocaleTimeString());
    Cell2.style.backgroundColor = 'white';
    Cell3.style.backgroundColor = 'black';
    newRow.addEventListener('click', () => {
        stop();
        document.body.style.color = Cell3.style.backgroundColor;
        document.body.style.backgroundColor = Cell2.style.backgroundColor;
    });


})();
