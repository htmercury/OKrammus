'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChampionSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the champion'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    size: {
        type: Number,
        default: 0
    },
    quotes: {
        type: [{
            type: String,
        }],
        default: []
    },
    flags: {
        type: String,
        default: "none"
    }
});

module.exports = mongoose.model('Champions', ChampionSchema);