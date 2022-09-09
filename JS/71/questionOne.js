'use strict';

const nums = [5, 86, 25];

function myMap(array, doSomething) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push(doSomething(array[i]));
    }
    return newArray;
}

function doMath(number) {
    return number += (Math.floor(Math.random() * 10));
}
const a = myMap(nums, doMath);
console.log(nums);
console.log(a);

// SL - nice! (but even better if you use the specific example I asked for...)

