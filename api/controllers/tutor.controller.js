const Tutor = require('../models/tutorModel');

exports.addTutor =  async (req,res) => {
    const tutorObj = {
        name: req.body.name,
        institution: req.body.institution,
        courses: req.body.courses,
        style: req.body.teachingStyle,
        sessions: req.body.sessions,
        availability: req.body.availability,
        zip: req.body.zip,
        rates: req.body.rates,
        bio: req.body.bio,

    }
    try{
        const tutor = await Tutor.create(tutorObj);
        res.status(200).send(tutor);
    } catch(err){
        console.log('Error adding tutor', err.message);
        res.status(500).send('Error trying to add tutor');

    }
}