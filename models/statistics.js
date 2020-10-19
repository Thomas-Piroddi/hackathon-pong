const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Statistics = new Schema({
    username: {
        type: String,
        required: true
    },
    highScore: {
        type: Number,
        required: true
    },
    averageScore: {
        type: Number,
        required: true
    },
    gamesPlayed: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('statistics', Statistics)