const express = require('express')
const app = express()

const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const passport = require('passport')

// socket io attempt --------------------
// const http = require('http')
// const path = require('path')


// const socketio = require('socket.io')
// const server = http.createServer(app)
// const io = socketio(server)

// app.use(express.static(path.join(__dirname, "public")))
// --------------------------------


const port = 3000



const pageRouter = require('./routes/index')


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
// server.listen(port, () => {
//     console.log(`Blog express app listening on port ${port}`);
// });

// const connections = [null, null]

// io.on('connection', socket => {
//     // console.log("new WS connection")

//     // find available player number
//     let playerIndex = -1
//     for (const i in connections){
//         if(connections[i] === null){
//             playerIndex = i
//             break
//         }
//     }

   

//     // tell the connecting client what player number they are
//     socket.emit('player-number', playerIndex)

//     console.log(`Player ${playerIndex} has connected`)

//     // ignore player 3
//     if (playerIndex === -1) return

// })