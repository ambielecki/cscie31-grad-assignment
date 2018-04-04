let User   = require('../models/userModel');
let bcrypt = require('bcryptjs');

let user_types = ['admin', 'user'];

module.exports.getCreate = function (req, res, next) {
    res.render('users/create.nunjuck.html', {
        user_types : user_types,
    });
};

module.exports.postCreate = async function (req, res, next) {
    if (req.body.password !== req.body.password_confirm) {
        req.flash('error', 'Password does not match confirmation');
        req.flash('old', {
            username : req.body.username,
            type     : req.body.type,
        });
        
        res.redirect('/users/create');
    } else {
        try {
            let salt = await bcrypt.genSalt();
            let hash = await bcrypt.hash(req.body.password, salt);
            let user = new User({
                username : req.body.username,
                password : hash,
                type     : req.body.type,
            });

            await user.save();
            req.flash('success', 'New user created');
            res.redirect('/');
        } catch (err) {
            req.flash('error', 'There was a problem handling your request, please try again');
            req.flash('old', req.body);
            res.redirect('back');
            console.log(err);
        }
    }
};