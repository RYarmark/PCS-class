window.app = window.app || {};

window.app.messageBox = (function () {
    'use strict';
    return { showMessage: (message) => alert(message) };
})();
