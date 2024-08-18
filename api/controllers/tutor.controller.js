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



exports.getAllTutors = async (req,res) => {
    try{
        const tutorQuery = {};
        const tutor = await Tutor.find(tutorQuery);
        res.status(200).send({
            tutor,
            message: 'Tutors fetched'
        })
    }catch(err){
        console.log('Tutors could not be fetched', err.message);
        res.status(500).send('Tutors could not be fetched');
    }
}



exports.getAllSessions = async (req,res) => {
    try{
        const sessions = await Tutor.distinct('sessions');
        res.status(200).send(sessions);

    }catch(err){
        console.log('Tutor session could  not be fetched', err.message);
        res.status(500).send('Tutor session could  not be fetched');

    }
}


exports.getTutorBySession = async(req,res) => {
    const { sessionName } = req.params;
    try {
        const tutors =  await Tutor.find({
            sessions: sessionName
        });
        res.status(200).send(tutors);

    }catch(err){
        console.log('Tutor could not be fetched using sessions',err.message);
        res.status(500).send({
            message: 'Tutor could not be fetched using sessions'
        
        });
        }
}