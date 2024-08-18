const Tutor = require('../models/tutorModel');

exports.addTutor =  async (req,res) => {
    const tutorObj = {
        name: req.body.name,
        institution: req.body.institution,
        courses: req.body.courses,
        style: req.body.style,
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

exports.getAllStyles = async (req,res) => {
    try{
        const style = await Tutor.distinct('style');
        res.status(200).send(style);

    }catch(err){
        console.log('Tutor style could  not be fetched', err.message);
        res.status(500).send('Tutor style could  not be fetched');

    }
}

exports.getTutorByStyle = async(req,res) => {
    const { styleName } = req.params;
    try {
        const tutors =  await Tutor.find({
            style: styleName
        });
        res.status(200).send(tutors);

    }catch(err){
        console.log('Tutor could not be fetched using style',err.message);
        res.status(500).send({
            message: 'Tutor could not be fetched using style'
        
        });
        }
}

exports.getAllCourses = async (req,res) => {
    try{
        const courses = await Tutor.distinct('courses');
        res.status(200).send(courses);

    }catch(err){
        console.log('Tutor courses could  not be fetched', err.message);
        res.status(500).send('Tutor courses could  not be fetched');

    }
}


exports.getTutorByCourse = async(req,res) => {
    const { courseName } = req.params;
    try {
        const tutors =  await Tutor.find({
            courses: courseName
        });
        res.status(200).send(tutors);

    }catch(err){
        console.log('Tutor could not be fetched using courses',err.message);
        res.status(500).send({
            message: 'Tutor could not be fetched using courses'
        
        });
        }
}

exports.getAllInstitution = async (req,res) => {
    try{
        const institution = await Tutor.distinct('institution');
        res.status(200).send(institution);

    }catch(err){
        console.log('Tutor institution could  not be fetched', err.message);
        res.status(500).send('Tutor institution could  not be fetched');

    }
}


exports.getTutorByInstitution = async(req,res) => {
    const { institutionName } = req.params;
    try {
        const tutors =  await Tutor.find({
            institution: institutionName
        });
        res.status(200).send(tutors);

    }catch(err){
        console.log('Tutor could not be fetched using institution',err.message);
        res.status(500).send({
            message: 'Tutor could not be fetched using institution'
        
        });
        }
}



exports.getAllAvailability = async (req,res) => {
    try{
        const availability = await Tutor.distinct('availability');
        res.status(200).send(availability);

    }catch(err){
        console.log('Tutor availability could  not be fetched', err.message);
        res.status(500).send('Tutor availability could  not be fetched');

    }
}


exports.getTutorByAvailability = async(req,res) => {
    const { availabilityName } = req.params;
    try {
        const tutors =  await Tutor.find({
            availability: availabilityName
        });
        res.status(200).send(tutors);

    }catch(err){
        console.log('Tutor could not be fetched using availability',err.message);
        res.status(500).send({
            message: 'Tutor could not be fetched using availability'
        
        });
        }
}



exports.getAllZip = async (req,res) => {
    try{
        const zip = await Tutor.distinct('zip');
        res.status(200).send(zip);

    }catch(err){
        console.log('Tutor zip could  not be fetched', err.message);
        res.status(500).send('Tutor zip could  not be fetched');

    }
}

