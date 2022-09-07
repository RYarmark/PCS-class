window.myApp = window.myApp || {};

window.myApp.utilsA = (function (counterA) {
    'use strict';

    let counter = 0;

    counterA.increment = () => counter++;
    counterA.getCount = () => counter;
    return counterA;

}(window.myApp.utilsA || {}));



