console.log('question 1');

const dayOfWeek = (function () {
    'use strict';

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];
    return {
        getDay: index => days[index - 1],
        getIndex: day => {
            for (let i = 0; i < days.length; i++) {
                if (days[i] === day) {
                    return i + 1;
                }
            }
        }
    };
}
)();
console.log(dayOfWeek.getDay(4));
console.log(dayOfWeek.getIndex('Monday'));

console.log('question 2');
const interestCalculater = (function () {
    'use strict';
    let rate = 0;
    let years = 0;
    return {
        calculateInterest: amount => amount * (rate + 1) ** years,
        setRate: setRate => rate = setRate,
        setYears: setYears => years = setYears
    };
}
)();

console.log(interestCalculater.setRate(5));
console.log(interestCalculater.setYears(2));
console.log(interestCalculater.calculateInterest(10));
