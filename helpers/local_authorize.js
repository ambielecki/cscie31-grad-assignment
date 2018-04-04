module.exports.isCoach = function (req, res, next) {
    if (typeof(req.user) !== 'undefined' && (req.user.type === 'user' || req.user.type === 'admin')) {
        next();
    } else {
        req.flash('error', 'Only authorized users may access this page, please login to continue');
        res.redirect('/login');
    }
};

// for admins only!
module.exports.isAdmin = function (req, res, next) {
    if (typeof(req.user) !== 'undefined' && req.user.type === 'admin') {
        next();
    } else {
        req.flash('error', 'Only authorized users may access this page, please login to continue');
        res.redirect('/login');
    }
};