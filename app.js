const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const passport = require('passport')

const pageRouter = require('./routes/page_routes')


// socket io attempt --------------------
const http = require('http')
const path = require('path')


const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)




// app.use(express.static('public'))
app.use(express.static(__dirname + '/public'))

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

