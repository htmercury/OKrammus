'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ChampionSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Kindly enter the name of the champion'
    },
    created_date: {
        type: Date,
        default: Date.now
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

var ClientSchema = new Schema({
    name: { type: String, unique: true, required: true },
    id: { type: String, required: true },
    secret: { type: String, required: true },
    userId: { type: String, required: true }
});

module.exports = mongoose.model('Champions', ChampionSchema);
module.exports = mongoose.model('Client', ClientSchema);