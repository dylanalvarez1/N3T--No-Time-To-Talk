const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

server = app.listen(3001, function(){
    console.log('server is running on port 3001')
});
app.get('/', function (req, res, next) {
    res.send("hello world");
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
        let user = { name: data.user, id: socket.id };
        users.push(user);
       
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

    socket.on('CREATE A ROOM', function() {
        //TODO: Create another room
    });

    socket.on('disconnect', function() {
        let leavingUser = '';
        users = users.filter(user => {
            if (socket.id == user.id)
                leavingUser = user.name;
            return user.id != socket.id;
        });
        // send leave message for the room
        io.emit('LEAVE_CHAT', leavingUser);
        
        // Update clients
        io.emit('REMOVE_USER', leavingUser);
        
    });
});
