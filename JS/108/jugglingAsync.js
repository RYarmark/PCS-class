'use strict';

const http = require("http");
const async = require ('async');

const urls = [];
for (let i = 2; i < process.argv.length ; i++){
    urls.push(process.argv[i]);
}

async.map(urls, (url, callback)=>{
    http.get(url, response =>{
        let returnData ='';
        response.on('data', data => returnData+= data)
        .on('end', ()=>callback(null, returnData) );
    });
   }, (err, results)=> {
    results.forEach(result => { console.log(result);        
    });
   }
);