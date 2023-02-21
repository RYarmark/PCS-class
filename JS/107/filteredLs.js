'use strict';

const fs = require('fs');
const path = require('path');
const directory = process.argv[2];
const extention = process.argv[3];

fs.readdir(`${directory}`, (err, list) => {
    list.forEach(f => {
        if (path.extname(f) === `.${extention}`) {
            console.log(f);
        }
    })
})