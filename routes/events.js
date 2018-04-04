let body_parser     = require('body-parser');
let express         = require('express');
let eventController = require('../controllers/eventController');
let router          = express.Router();
let local_auth      = require('../helpers/local_authorize');

let urlencodedParser = body_parser.urlencoded({ extended: false });

// create
router.get('/create', local_auth.isCoach, eventController.getCreate);
router.post('/create', [local_auth.isCoach, urlencodedParser], eventController.postCreate);

// update
router.get('/edit/:id', local_auth.isCoach, eventController.getEdit);
router.post('/edit/:id', [local_auth.isCoach, urlencodedParser], eventController.postEdit);

// delete
router.post('/delete/:id', [local_auth.isCoach, urlencodedParser], eventController.postDelete);

// list
router.get('/', eventController.getList);

module.exports = router;