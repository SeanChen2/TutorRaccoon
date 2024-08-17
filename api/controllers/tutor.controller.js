const Tutor = require('../models/tutorModel');

exports.addTutor =  async (req,res) => {
    const tutorObj = {
        name: req.body.name,
        university: req.body.university,
        teachingStyle: req.body.teachingStyle,
        sessions: req.body.sessions,
        location: req.body.location,
        rates: req.body.rates,
        personality: req.body.personality,

    }
    try{
        const tutor = await Tutor.create(tutorObj);
        res.status(200).send(tutor);
    } catch(err){
        console.log('Error adding tutor', err.message);
        res.status(500).send('Error trying to add tutor');

    }
}