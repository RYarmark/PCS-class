'use strict';

const http = require('http');
let returnData = '';

http.get(process.argv[2], (response) => {
    response.on('data', (data) => returnData += data);
    response.on('end', () => {
        console.log(returnData.length);
        console.log(returnData);
    })
})
