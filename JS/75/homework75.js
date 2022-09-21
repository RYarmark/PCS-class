window.app = window.app || {};
window.app.tools = (function () {
    'use strict';

    function get(selector) {
        return document.querySelector(selector);
    }

    function setCss(elem, property, value) {
        elem.style[property] = value;

    }

    return {
        wrap: function (selector) {
            const elem = get(selector);
            const colors = ['red', 'yellow', 'green', 'blue'];
            return {
                changeColor: function (time, speed = 1000) {
                    let i = 0;
                    let interval;
                    setTimeout(() => clearInterval(interval), time * 1000);
                    setCss(elem, 'backgroundColor', colors[i++ % 4]);
                    interval = setInterval(() => { setCss(elem, 'backgroundColor', colors[i++ % 4]); }, speed * 1000);
                    console.log(i);
                    return this;
                }
            };
        }

    };
}());