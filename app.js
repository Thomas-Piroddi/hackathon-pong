const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const passport = require('passport')

const pageRouter = require('./routes/page_routes')
// import { socker } from './socker'
// import { API_PORT, host } from './env'
// import http from 'http'
// const server = new http.Server(app)
// socker(server)

// app.lsiten(API_PORT, () => {
//     logger.info(`Api listening on port ${Number(API_PORT)} `)
// })

// server.listen(Number(API_PORT) + 1, () => {
//     logger.info(`Socker listening on port ${Number(API_PORT) + 1}!`)
//     logger.info(`Api and socker whitelisted for ${host}`)

// })

// socket io attempt --------------------
const http = require('http')
const path = require('path')


const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)

// server.listen(4000, () => {
//     console.log('listening on *:4000');
// });

// app.use(express.static(path.join(__dirname, "public")))
// --------------------------------

// io.on('connection', (socket) => {
//     console.log('a user connected:', socket.id);
//     socket.on('disconnect', function() {
//       console.log('user disconnected');
//     });
// });




app.use(express.static('public'))


// connect to local database
const dbConn = 'mongodb://localhost/hackathon_pong'

mongoose.connect(dbConn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},
(err) => {
    if (err) {
        console.log('Error connecting to database', err);
    } else {
        console.log('Connected to database!');
    }
});

// set up express handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/', pageRouter)


app.listen(port, () => {
    console.log(`Blog express app listening on port ${port}`);
});


// for socket tutorial :
server.listen(4000, () => {
    console.log(`server listening on port ${4000}`);
});

const connections = [null, null]

io.on('connection', socket => {
    console.log("new WS connection")

    // find available player number
    let playerIndex = -1
    for (const i in connections){
        if(connections[i] === null){
            playerIndex = i
            break
        }
    }
   

    // tell the connecting client what player number they are
    socket.emit('player-number', playerIndex)

    console.log(`Player ${playerIndex} has connected`)

    // ignore player 3
    if (playerIndex === -1) return

    connections[playerIndex] = false

    // tell everyone what player num just connected
    socket.broadcast.emit('player-connection', playerIndex)

})