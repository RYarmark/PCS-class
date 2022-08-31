window.myApp = window.myApp || {};

window.myApp.utils = (function (stringCaseInsensitiveEquals) {
    'use strict';

    stringCaseInsensitiveEquals.compare = (stringOne, stringTwo) => console.log(stringOne.toUpperCase() === stringTwo.toUpperCase());
    return stringCaseInsensitiveEquals;
})(window.myApp.utils || {});
