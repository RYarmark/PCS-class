(function () {
    'use strict';

    const messageDiv = document.getElementById('messages');
    const submit = document.getElementById('submit');
    const message = document.getElementById('message');
    const socketIo = io();

    socketIo.on('msg', msg => {
        const span = document.createElement('span');
        span.id = "broadcasted"
        span.innerText = msg;
        messageDiv.append(span);

    });



    submit.addEventListener('click', sendMessage);

    function sendMessage() {
        if (message.value) {
            socketIo.emit('foo', message.value);
            const span = document.createElement('span')
            span.id = 'thisSocket';
            span.innerText = message.value;
            messageDiv.append(span);
        }
        message.value = "";
    }
})();