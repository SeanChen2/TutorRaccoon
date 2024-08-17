const mongoose = require('mongoose');
const { type } = require('os');

const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    university: {
        type: String,
        required: true
    },

 

    teachingStyle: {
        type: String,
        required: false
    },

    sessions: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    rates: {
        type: String,
        required: true
    },

    personality: {
        type: String,
        required: false
    },


});


module.exports = mongoose.model('Tutor', tutorSchema);