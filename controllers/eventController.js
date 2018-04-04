let Event  = require('../models/eventModel');
let moment = require('moment-timezone');

const event_types = ['game', 'practice', 'other'];

// this looks a lot nicer with async / await
module.exports.getList = async function (req, res, next) {
    let today = moment().tz('America/New_York').format('YYYY-MM-DD');
    try {
        [future_events, past_events] = await Promise.all([
            Event.find({date : {$gte : today}}).sort({date : 1, time : 1}),
            Event.find({date : {$lt : today}}).sort({date : 1, time : 1}),
        ]);
        res.render('events/list.nunjuck.html', {
            future_events : future_events,
            past_events   : past_events,
        });
    } catch (err) {
        res.render('events/list.nunjuck.html', {
            error : ['There was a problem retrieving events.'],
        });
    }
};

module.exports.getCreate = function (req, res, next) {
    res.render('events/create.nunjuck.html', {
        event_types : event_types,
    });
};

module.exports.postCreate = async function (req, res, next) {
    let event = new Event({
        date        : req.body.date,
        time        : req.body.time,
        location    : req.body.location,
        title       : req.body.title,
        description : req.body.description,
        type        : req.body.type,
    });

    try {
        await event.save();
        req.flash('success', `Your event for ${event.date} was created successfully.`);
        res.redirect('/events');
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
        event = await Event.findById(req.params.id);
        res.render('events/edit.nunjuck.html', {
            event       : event,
            event_types : event_types,
        });
    } catch (err) {
        console.log(err);
        req.flash('error', 'Event not found.');
        res.redirect('/events');
    }
};

module.exports.postEdit = async function (req, res, next) {
    try {
        let event = await Event.findById(req.params.id);

        event.date        = req.body.date;
        event.time        = req.body.time;
        event.location    = req.body.location;
        event.title       = req.body.title;
        event.description = req.body.description;
        event.type        = req.body.type;

        await event.save();
        req.flash('success', `Your event for ${event.date} has been edited.`);
        res.redirect('/events');
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
        await Event.remove({_id: req.params.id});
        req.flash('success', 'Event cancelled successfully');
        res.redirect('/events');
    } catch (err) {
        req.flash('error', 'There was a problem handling your request.');
        res.redirect('back');
    }
};