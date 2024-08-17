const mongoose = require('mongoose');
const { type } = require('os');

const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    institution: {
        type: String,
        required: true
    },

    courses: {
        type: Array,
        required: true
    },

 

    style: {
        type: Array,
        required: false
    },

    sessions: {
        type: Array,
        required: true
    },

    availability: {
        type: Array,
        required: true
    },

    zip: {
        type: String,
        required: true
    },

    rates: {
        type: String,
        required: true
    },

    bio: {
        type: String,
        required: true
    },


});


module.exports = mongoose.model('Tutor', tutorSchema);