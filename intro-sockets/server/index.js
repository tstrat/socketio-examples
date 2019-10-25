const express = require('express')
require('dotenv').config()
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);


const { SERVER_PORT } = process.env

io.on('connect', (socket) => {
    socket.on('message', (message) => {
        console.log('From the client:', message)
        socket.emit('message', message)
    })
})

let port = SERVER_PORT || 4000;
server.listen(port, () => console.log(`Server started, port: ${port}
Don't spook the monkey 🙈`))
