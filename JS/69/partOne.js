window.myApp = window.myApp || {};

window.myApp.utils = (function (getDayByName) {
    'use strict';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];
    getDayByName.getDay = index => console.log(days[index - 1]);
    getDayByName.getIndex = day => {
        for (let i = 0; i < days.length; i++) {
            if (days[i] === day) {
                console.log(i + 1);
                return;
            }
        }
    };

    return getDayByName;
})(window.myApp.utils || {});



