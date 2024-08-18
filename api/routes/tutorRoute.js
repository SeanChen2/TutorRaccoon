const tutorController = require('../controllers/tutor.controller');

module.exports = function(app) {
    app.post('/api/tutor/add', tutorController.addTutor);
    app.get('/api/tutor',tutorController.getAllTutors);
    app.get('/api/tutor/sessions',tutorController.getAllSessions);
    app.get('/api/tutor/sessions/:sessionName',tutorController.getTutorBySession);
    app.get('/api/tutor/style',tutorController.getAllStyles);
    app.get('/api/tutor/style/:styleName',tutorController.getTutorByStyle);
    app.get('/api/tutor/courses',tutorController.getAllCourses);
    app.get('/api/tutor/courses/:courseName',tutorController.getTutorByCourse);
    app.get('/api/tutor/institution',tutorController.getAllInstitution);
    app.get('/api/tutor/institution/:institutionName',tutorController.getTutorByInstitution);
    app.get('/api/tutor/zip',tutorController.getAllZip);


}


