let body_parser     = require('body-parser');
let express         = require('express');
let router          = express.Router();
let passport        = require('passport');

let urlencodedParser = body_parser.urlencoded({ extended: false });

// just not worth a controller for this - should probably have a check to prevent a logged in user here
router.get('/', (req, res, next) => {
    res.render('login/login.nunjuck.html');
});
router.post('/',
    [
        urlencodedParser,
        passport.authenticate('local', {
            successRedirect : '/',
            failureRedirect : '/login',
            failureFlash    : true,
            successFlash    : true,
        })
    ],
    (req, res, next) => {
        res.redirect('/')
    },
);

module.exports = router;