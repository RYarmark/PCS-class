window.app = window.app || {};
window.app.messageBox = (function () {
    'use strict';

    const defaultButton = ['ok'];
    const buttonsDiv = document.createElement('div');

    buttonsDiv.style.position = 'absolute';
    buttonsDiv.style.width = '100%';
    buttonsDiv.style.left = 0;
    buttonsDiv.style.bottom = '1em';

    let funcToUse;

    function showMessageBox(message, buttons = defaultButton, callback = null) {

        const messageBox = document.createElement('div');
        funcToUse = callback;

        messageBox.id = 'messageBox';

        const text = document.createElement('span');
        text.innerText = message;
        messageBox.appendChild(text);
        document.body.appendChild(messageBox);
        buttons.forEach(buttonCreater);
        messageBox.appendChild(buttonsDiv);


    }

    function buttonCreater(name) {
        const button = document.createElement('button');
        button.innerText = name;
        button.id = 'button';
        buttonsDiv.appendChild(button);
        if (funcToUse) {
            button.addEventListener('click', funcToUse);
        }
    }
    function test() {
        document.getElementById('messageBox').style.backgroundColor = this.innerText;
        console.log('this works');
    }

    return {
        display: showMessageBox,
        test: test
    };



}());