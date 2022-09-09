window.myApp = window.myApp || {};

window.myApp.utilsA = (function (counterA) {
    'use strict';

    let counter = 0;

    counterA.increment = () => counter++;
    counterA.getCount = () => counter;
    return counterA;

}(window.myApp.utilsA || {}));

// SL - nice. You did a little extra here, we dont plan on splitting utilsA across multiple files so dont really need to allow for it to possibly exist and add functions to it, but not a problem, just not required.
// also why not call it counter instead of utilsA?



