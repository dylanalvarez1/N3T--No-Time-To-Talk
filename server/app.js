const express = require('express');
const app = express();

server = app.listen(3001, function(){
    console.log('server is running on port 3001')
});



const io = require('socket.io')(server);
io.set('origins', '*:*');
let users = {};
let rooms = {};
io.on('connection', function(socket) {

    console.log(socket.id);

    //Creates dict to link <username, socket.id>

    io.emit('USERS', users);
    io.emit('ROOMS', rooms);

    socket.on('CREATE_CHAT', function(data) {
        console.log('chat creation');
        rooms[data] = 'on';
    })
    socket.on('SEND_MESSAGE', function(data) {
        console.log("server send message");
        io.emit('MESSAGE', data);
        console.log("DATA:" + JSON.stringify(data));
    });
    socket.on('ENTER_CHAT', function(data) {
        console.log("Connected user data: ", JSON.stringify(data));
        socket.broadcast.emit('ENTER_CHAT', data);
        console.log("AFTER EMIT ENTER_CHAT");
        //Associate the user id with the user nickname
        users[data.user] = socket.id;
        //users.set('test user', 'DFAPHFDPAODSIHFDSAFP');
       
        //Update clients with user list
        io.emit('USERS', users);
        console.log("enter event current user list: ", users);
    });
    socket.on('TYPING', function(data) {
        console.log("This user is typing: ", JSON.stringify(data));
        socket.broadcast.emit('TYPING', data);
    });
    socket.on('TYPINGDONE', function(data) {
        console.log("No more typing");
        socket.broadcast.emit('TYPINGDONE', data);
    });
    socket.on('USERS', function() {
        io.emit('USERS', users);
        console.log("server user list: ", users);
    });
    socket.on('disconnect', function() {
        let removeKey;
        let keys = Object.keys(users);
        //Find the user whose socket id disconnected
        for (const key of keys) {
            if(users[key] == socket.id) {
                removeKey = key;
            }
        }
        if(removeKey != null) {
            //update client
            socket.emit('LEAVE_CHAT', removeKey);
            delete(users.removeKey);
            console.log("WHAT VALUE IS AT REMOVE KEY: ", users[removeKey]);

            console.log("disconnected user list: ", users);
        }
        //Update clients
        users.forEach(user => {
            console.log("user: ", user);
        });
        io.emit('USERS', users);
        
    });
});
