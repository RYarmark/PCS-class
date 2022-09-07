window.myApp = window.myApp || {};

window.myApp.utilsB = (function (counterB) {
    'use strict';
    let numOfCounters = 0;

    counterB.createCounter = function createCounter() {
        numOfCounters++;
        let counter = 0;
        return {
            increment: () => counter++,
            getCount: () => counter
        };
    };

    counterB.getNumOfCounter = () => numOfCounters;

    return counterB;

}(window.myApp.utilsB || {}));




