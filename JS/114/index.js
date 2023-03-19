const express = require('express');
const http = require('http');
const io = require('socket.io');
const path = require('path');
const app = express();

const server = http.createServer(app);
const socketIo = io(server);

app.use(express.static(path.join(__dirname, 'public')));

socketIo.on('connection', socket => {


    socket.on('foo', msg => {
        socket.broadcast.emit('msg', msg)
    });
});

app.get('/', (req, res, next) => {
    res.end('hello world');
});
server.listen(80);
