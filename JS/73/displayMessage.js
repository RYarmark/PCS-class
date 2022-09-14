(function () {
    'use strict';

    const text = document.getElementById('input');

    document.getElementById('submit').addEventListener('click', setTextAndClear);

    function setTextAndClear() {
        window.app.messageBox.showMessage(text.value);
        text.value = "";
    }
}());