let age_calculator = require('../helpers/age_calculator');
let fs             = require('fs');
let multer         = require('multer');
let Player         = require('../models/playerModel');

const multer_storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, 'public/images/players')
    },
    filename : function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    },
});

const imageFilter = function (req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        cb(null, true);
    } else {
        cb(new Error('OnlyImageFilesAllowed'), false);
    }
};

module.exports.storage = multer_storage;
module.exports.imageFilter = imageFilter;

module.exports.getList = async function (req, res, next) {
    try {
        let players = await Player.find({});
        players.forEach(function (player) {
            player.league_age = age_calculator.getLeagueAge(Date.parse(player.date_of_birth));
        });

        res.render('players/list.nunjuck.html', {
            players : players,
        });
    } catch (err) {
        console.log(err);
        res.render('players/list.nunjuck.html', {
            error : ['There was a problem retrieving players.'],
        });
    }
};

module.exports.getCreate = function (req, res, next) {
    res.render('players/create.nunjuck.html');
};

module.exports.postCreate = async function (req, res, next) {
    let player = new Player({
        first_name    : req.body.first_name,
        last_name     : req.body.last_name,
        date_of_birth : req.body.date_of_birth,
        image_name    : typeof(req.file) !== 'undefined' ? req.file.filename : 'unknown.jpg',
    });

    try {
        await player.save();
        req.flash('success', `${player.first_name} ${player.last_name} was successfully added`);
        res.redirect('/players');
    } catch (err) {
        for (let error_name in err.errors) {
            req.flash('error', err.errors[error_name].message)
        }
        req.flash('old', req.body);
        res.redirect('back');
        console.log(err);
    }
};

module.exports.getEdit = async function (req, res, next) {
    try {
        let player = await Player.findById(req.params.id);
        res.render('players/edit.nunjuck.html', {
            player : player,
        });
    } catch (err) {
        console.log(err);
        req.flash('error', 'Player not found.');
        res.redirect('/players');
    }
};

module.exports.postEdit = async function (req, res, next) {
    try {
        let player = await Player.findById(req.params.id);

        player.first_name    = req.body.first_name;
        player.last_name     = req.body.last_name;
        player.date_of_birth = req.body.date_of_birth;

        if (typeof(req.file) !== 'undefined') {
            if (player.image_name !== 'unknown.jpg') {
                try {
                    fs.unlinkSync(`./public/images/players/${player.image_name}`);
                } catch (err) {
                    console.log('problem deleting image');
                }
            }
            player.image_name = req.file.filename;
        }

        await player.save();
        req.flash('success', `${player.first_name} ${player.last_name} was edited successfully.`);
        res.redirect('/players');
    } catch (err) {
        console.log(err);
        for (let error_name in err.errors) {
            req.flash('error', err.errors[error_name].message)
        }
        req.flash('old', req.body);
        res.redirect('back');
    }
};

module.exports.postDelete = async function (req, res, next) {
    try {
        await Player.remove({_id: req.params.id});
        req.flash('success', 'Player removed successfully');
        res.redirect('/players');
    } catch (err) {
        req.flash('error', 'There was a problem handling your request.');
        res.redirect('back');
    }
};