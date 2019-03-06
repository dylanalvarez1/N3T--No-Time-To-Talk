const express = require('express');
const app = express();

server = app.listen(3001, function(){
    console.log('server is running on port 3001')
});

const io = require('socket.io')(server);
io.set('origins', '*:*');
io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        console.log("server send message");
        io.emit('MESSAGE', data);
        console.log("DATA:" + JSON.stringify(data));
    });
    socket.on('ENTER_CHAT', function(data) {
        console.log("Connected user data: ", JSON.stringify(data));
        socket.broadcast.emit('ENTER_CHAT', data);
    })
});