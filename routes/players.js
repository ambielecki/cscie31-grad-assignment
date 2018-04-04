let express          = require('express');
let multer           = require('multer');
let playerController = require('../controllers/playerController');
let router           = express.Router();
let local_auth       = require('../helpers/local_authorize');

let upload = multer({
    storage    : playerController.storage,
    fileFilter : playerController.imageFilter,
});

// create
router.get('/create', local_auth.isCoach, playerController.getCreate);
router.post('/create', [local_auth.isCoach, upload.single('photo')], playerController.postCreate);

// update (I always use edit in my routes instead of update)
router.get('/edit/:id', local_auth.isCoach, playerController.getEdit);
router.post('/edit/:id', [local_auth.isCoach, upload.single('photo')], playerController.postEdit);

// delete
router.post('/delete/:id', [local_auth.isCoach, upload.single('photo')], playerController.postDelete);

// list method
router.get('/', playerController.getList);

// basic error handling for images
router.use(function(err, req, res, next) {
    if (err.message === "OnlyImageFilesAllowed") {
        req.flash('errors', "Only uploads of jpg or png are allowed");
        req.flash('old', req.body);
        res.redirect('back');
    } else {
        next(err);
    }
});

module.exports = router;