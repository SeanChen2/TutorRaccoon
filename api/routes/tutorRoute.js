const tutorController = require('../controllers/tutor.controller');

module.exports = function(app) {
    app.post('/api/tutor/add', tutorController.addTutor);
}