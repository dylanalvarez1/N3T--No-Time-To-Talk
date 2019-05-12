const express = require('express');
const cors = require('cors');
let bodyparser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

server = app.listen(3001, function () {
    console.log('server is running on port 3001')
});
app.get('/', function (req, res, next) {
    res.send("hello world");
});

app.post('/login', function (req, res, next) {
    let name = req.body.name;
    if (name === undefined) {
        res.status(501).send({ msg: "Please enter a name." })
    } else if (users.filter(user => user.name === name).length > 0) {
        res.status(501).send({ msg: "This name is not unique. Please choose another." })
    } else {
        res.status(200).send({});
    }

})


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
        let leavingusers = users.filter(user =>
            user.id == socket.id
        );
        leavingusers.forEach(user => {
            io.sockets.in(user.room).emit('LEAVE_CHAT', user);

            // Update clients
            io.sockets.in(user.room).emit('REMOVE_USER', user);

        })

        users = users.filter(user => user.id != socket.id);

    });
});
