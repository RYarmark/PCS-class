(function () {
    'use strict';
    let i = 1;
    const myButton = document.createElement('button');
    document.body.appendChild(myButton);
    myButton.textContent = i;

    document.body.addEventListener('click', () => {
        i++;
        const myButton = document.createElement('button');
        document.body.appendChild(myButton);
        myButton.textContent = i;
        myButton.style.margin = '5px';

    });
}());