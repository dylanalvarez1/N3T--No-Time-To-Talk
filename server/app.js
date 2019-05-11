const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

server = app.listen(3001, function () {
    console.log('server is running on port 3001')
});
app.get('/', function (req, res, next) {
    res.send("hello world");
});



const io = require('socket.io')(server);
io.set('origins', '*:*');
let users = [];

io.on('connection', function (socket) {

    socket.on('SEND_MESSAGE', function (data) {
        io.sockets.in(data.room).emit('MESSAGE', data);
    });

    socket.on('ENTER_CHAT', function (data) {
        socket.join(data.room);
        let user = { name: data.user, id: socket.id, room: data.room };
        users.push(user);

        //get the userlist for the room, includes newcomer
        let newUsers = users.filter(user =>
            user.room === data.room
        );
        io.sockets.in(data.room).emit('GET_USERS_IN_ROOM', { users: newUsers, room: data.room });

        io.sockets.in(data.room).emit('ENTER_CHAT', data);


    });

    socket.on('LEAVE_CHAT', function (data) {
        socket.leave(data.room);
        io.sockets.in(data.room).emit('LEAVE_CHAT', data);
    });

    socket.on('CREATE_CHAT', function (data) {

        socket.emit('CREATE_CHAT', data);
        // for searching later
        // io.emit('UPDATE_SEARCH_LIST', data);
    })
    socket.on('TYPING', function (data) {
        io.sockets.in(data.room).emit('TYPING', data);
    });

    socket.on('TYPINGDONE', function (data) {
        io.sockets.in(data.room).emit('TYPINGDONE', data);
    });

    socket.on('disconnect', function (data) {
        users = users.filter(user =>
            user.id == socket.id
        );
        users.forEach(user => {
            io.sockets.in(user.room).emit('LEAVE_CHAT', user);

            // Update clients
            io.sockets.in(user.room).emit('REMOVE_USER', user);

        })

    });
});
