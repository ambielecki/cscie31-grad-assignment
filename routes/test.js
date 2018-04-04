let body_parser    = require('body-parser');
let express        = require('express');
let testController = require('../controllers/testController');
let router         = express.Router();
let local_auth     = require('../helpers/local_authorize');

// create
router.get('/user', local_auth.isAdmin, testController.getUserTest);
router.get('/admin', local_auth.isCoach, testController.getAdminTest);

module.exports = router;