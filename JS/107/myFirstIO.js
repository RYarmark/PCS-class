const fs = require('fs');
'use strict';

const buffer = fs.readFileSync(process.argv[2], 'utf8');

const arr = buffer.split("\n");

console.log(arr.length - 1);