module.exports.isCoach = function (req, res, next) {
    if (typeof(req.user) !== 'undefined' && (req.user.type === 'coach' || req.user.type === 'admin')) {
        next();
    } else {
        req.flash('error', 'Only authorized users may access this page, please login to continue');
        res.redirect('/login');
    }
};

// sorry, TAs just get to be a coach, no user methods for you
module.exports.isAdmin = function (req, res, next) {
    if (typeof(req.user) !== 'undefined' && req.user.type === 'admin') {
        next();
    } else {
        req.flash('error', 'Only authorized users may access this page, please login to continue');
        res.redirect('/login');
    }
};