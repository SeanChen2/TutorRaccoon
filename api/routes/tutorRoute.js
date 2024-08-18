const tutorController = require('../controllers/tutor.controller');

module.exports = function(app) {
    app.post('/api/tutor/add', tutorController.addTutor);
    app.get('/api/tutor',tutorController.getAllTutors);
    app.get('/api/tutor/sessions',tutorController.getAllSessions);
    app.get('/api/tutor/sessions/:sessionName',tutorController.getTutorBySession);


}


