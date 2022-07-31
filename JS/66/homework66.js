'use strict';

console.log('question 1');
const upperArray = ['A', 'B', 'C'];
const lowerArray = ['a', 'b', 'c'];
const mixedArray = ['a', 'B', 'c'];


function myEvery(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (!(allUpper(array[i]))) {
            return false;
        }
    }
    return true;
}

let allUpper = (letter) => letter === letter.toUpperCase();
let allLower = (letter) => letter === letter.toLowerCase();
console.log(myEvery(lowerArray, allUpper));
console.log(upperArray.every(allLower));

/*number 2*/
console.log('question 2');


function mySome(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (someUpper(array[i])) {
            return true;
        }
    }
    return false;
}

let someUpper = (letter) => letter === letter.toLowerCase();
console.log(mySome(upperArray, allLower));
console.log(mySome(mixedArray, allLower));
console.log(upperArray.some(someUpper));

/*number 5 */
console.log('question 5');

function multiplier(num1, num2) {
    return num1 * num2;
}
console.log(multiplier(44, 2));

/*number 6*/
console.log('question 6');
function getMultiplier() {
    return function (num1, num2) {
        return num1 * num2;
    };
}

const myMultiplier = getMultiplier();
console.log(myMultiplier(3, 7));

/* number 7*/
console.log('question 7');

function getMultiplier2(num1) {
    return function (num2) {
        return num1 * num2;
    };
}

const doubleANumber = getMultiplier2(2);
console.log(doubleANumber(8));