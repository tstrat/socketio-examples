const express = require('express');
const session = require('express-session');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const axios = require('axios');
//endpoints here
app.use(express.json());
app.use(
    session({
        secret: 'my secret',
        saveUninitialized: false,
        resave: false
    })
);

app.get('/session', (req, res) => {
    res.status(200).send(req.session);
});

app.put('/session', (req, res) => {
    console.log(req.body);
    req.session.user = req.body;
    res.status(200).send(req.session);
});

io.on('connection', socket => {
    socket.on('get session', () => {
        axios.get('http://localhost:4000/session').then(response => {
            let session = response.data;
            console.log('get', session);
            socket.emit('session', session.user || {});
        });
    });

    socket.on('set session', user => {
        axios.put('http://localhost:4000/session', user).then(response => {
            let session = response.data;
            console.log('set', session);

            socket.emit('session', session.user || {});
        });
    });
});
server.listen(4000, () => console.log('listening on 4000'));
