let express        = require('express');
let router         = express.Router();
let multer         = require('multer');
let postController = require('../controllers/postController');
let local_auth     = require('../helpers/local_authorize');

let upload = multer({
    storage    : postController.storage,
    fileFilter : postController.imageFilter,
});

router.get('/create', local_auth.isCoach, postController.getCreate);
router.post('/create', [local_auth.isCoach, upload.single('lead_image')], postController.postCreate);

router.get('/edit/:id', local_auth.isCoach, postController.getEdit);
router.post('/edit/:id', [local_auth.isCoach, upload.single('lead_image')], postController.postEdit);

router.post('/delete/:id', [local_auth.isCoach, upload.single('lead_image')], postController.postDelete);

router.get('/view/:id', postController.getView);
router.get('/', postController.getList);

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