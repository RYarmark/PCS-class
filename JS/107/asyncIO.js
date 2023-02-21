'use strict';

const fs = require('fs');

fs.readFile(process.argv[2], (err, buffer) => {
    const str = buffer.toString();
    const arr = str.split("\n");
    console.log(arr.length - 1);
})

