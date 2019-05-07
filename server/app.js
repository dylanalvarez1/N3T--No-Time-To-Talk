const express = require('express');
const app = express();

server = app.listen(3001, function(){
    console.log('server is running on port 3001')
});



const io = require('socket.io')(server);
io.set('origins', '*:*');
let users = [];
let rooms = [];
io.on('connection', function(socket) {
    
    socket.on('CREATE_CHAT', function(data) {
        rooms[data] = 'on';
    })

    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data);
    });

    socket.on('ENTER_CHAT', function(data) {
        socket.broadcast.emit('ENTER_CHAT', data);
        
        //Associate the user id with the user nickname
        users.push({ name: data.user, id: socket.id });
       
        //Update clients with user list
        io.emit('USERS', users);
    });
    socket.on('TYPING', function(data) {
        socket.broadcast.emit('TYPING', data);
    });

    socket.on('TYPINGDONE', function(data) {
        socket.broadcast.emit('TYPINGDONE', data);
    });

    socket.on('USERS', function() {
        io.emit('USERS', users);
    });

    socket.on('disconnect', function() {

        users = users.filter(user => user.id != socket.id);
        socket.emit('LEAVE_CHAT', socket.id);
        
        //Update clients
        io.emit('USERS', users);
        
    });
});
