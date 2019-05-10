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
let rooms = [];

io.on('connection', function (socket) {

    console.log(socket.id);
    socket.on('CREATE_CHAT', function (data) {
        rooms[data] = 'on';
    })

    socket.on('SEND_MESSAGE', function (data) {
        io.sockets.in(data.room).emit('MESSAGE', data);
    });

    socket.on('ENTER_CHAT', function (data) {
        socket.join(data.room);
        io.sockets.in(data.room).emit('ENTER_CHAT', data);

        //Associate the user id with the user nickname
        let user = { name: data.user, id: socket.id };
        users.push(user);

        //Update clients with user list
        io.sockets.in(data.room).emit('USERS', users);
    });
    socket.on('TYPING', function (data) {
        io.sockets.in(data.room).emit('TYPING', data);
    });

    socket.on('TYPINGDONE', function (data) {
        io.sockets.in(data.room).emit('TYPINGDONE', data);
    });

    socket.on('USERS', function (data) {
        io.sockets.in(data.room).emit('USERS', users);
    });

    socket.on('SUBSCRIBE', function (data) {
        //Create another room
        socket.join(data.room);
    });

    socket.on('UNSUBSCRIBE', function (data) {
        //unsubscribe from everything but data.room
        let arr = ['Global', 'Games', 'Anime'];
        arr.forEach(el => {
            if (data.room != el) {
                socket.leave(el);
            }
        })
    });

    socket.on('disconnect', function (data) {
        let leavingUser = '';
        users = users.filter(user => {
            if (socket.id == user.id)
                leavingUser = user.name;
            return user.id != socket.id;
        });
        // send leave message for the room
        io.sockets.in(data.room).emit('LEAVE_CHAT', leavingUser);

        // Update clients
        io.sockets.in(data.room).emit('REMOVE_USER', leavingUser);

    });
});
