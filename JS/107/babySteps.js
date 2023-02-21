'use strict';

let x = 0;
for (let i = 2; i < process.argv.length; i++) {
    x += Number(process.argv[i]);
}
console.log(x)