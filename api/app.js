const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


const DB_URL = process.env.atlas_URL;
mongoose.connect(DB_URL);
const conn = mongoose.connection;
conn.once('open', () => {
    console.log('Successfully conncected to database');
})
conn.on('error', () => {
    console.log('Failed to connect to database');
})

app.get('/', (req,res) =>  {
    res.send('Tutor Raccoon ')
})

require('./routes/tutorRoute')(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
})