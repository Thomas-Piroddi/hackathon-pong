const express = require('express')

const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const passport = require('passport')
const port = 3000
const app = express()

const pageRouter = require('./routes/page_routes')


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