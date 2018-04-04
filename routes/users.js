let body_parser    = require('body-parser');
let express        = require('express');
let userController = require('../controllers/userController');
let router         = express.Router();
let local_auth     = require('../helpers/local_authorize');

let urlencodedParser = body_parser.urlencoded({ extended: false });

// create
router.get('/create', local_auth.isAdmin, userController.getCreate);
router.post('/create', [local_auth.isAdmin, urlencodedParser], userController.postCreate);

module.exports = router;