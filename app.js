require('dotenv').config();

let express       = require('express');
let nunjucks      = require('nunjucks');
let cookie_parser = require('cookie-parser');
let session       = require('express-session');
let mongoose      = require('mongoose');
let flash         = require('connect-flash');
let bcrypt        = require('bcryptjs');

let User = require('./models/userModel');

// routing requirements
let root    = require('./routes/root');
let players = require('./routes/players');
let posts   = require('./routes/posts');
let events  = require('./routes/events');
let users   = require('./routes/users');
let login   = require('./routes/login');

// auth requirements
let passport      = require('passport');
let LocalStrategy = require('passport-local');

let app = express();

// I am using mongo locally with no auth and with auth on DO (I installed there instead of using Atlas)
if (process.env.APP_ENV === 'local') {
    mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/baseball`);
} else {
    mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/baseball`);
}

// sessions and flash
app.use(cookie_parser(process.env.APP_SECRET || 'some_secret'));
app.use(session({
    secret            : process.env.APP_SECRET || 'some_secret',
    resave            : 'true',
    saveUninitialized : 'true',
}));

app.use(flash());

// template config
nunjucks.configure('views', {
    autoescape : true,
    express    : app
});

// authentication config - this is the boilerplate from passport + plus some SO suggestions
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message : 'Incorrect username.' });
            }
            bcrypt.compare(password, user.password, function (err, res) {
                if (err) return done(null, false, { message : 'We encountered a problem logging you in' });
                if (res === false) {
                    return done(null, false, { message : 'Incorrect password.' });
                } else {
                    return done(null, user, { message : 'Successfully Logged In!'} );
                }
            });
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());

// set locals for flash variables and user
app.use((req, res, next) => {
    res.locals.error     = req.flash('error');
    res.locals.success   = req.flash('success');
    res.locals.old       = req.flash('old')[0];
    res.locals.user_type = typeof(req.user) !== 'undefined' ? req.user.type : null;
    next();
});

// routing
app.use('/', root);
app.use('/players', players);
app.use('/posts', posts);
app.use('/events', events);
app.use('/users', users);
app.use('/login', login);
// just not worth setting up a route file for this
app.use('/logout', function (req, res){
    req.logout();
    res.redirect('back');
});

// static routing
app.use('/css', express.static('./public/css'));
app.use('/images', express.static('./public/images'));
app.use('/js', express.static('./public/js'));
app.use('/libraries', express.static('./public/libraries'));

module.exports = app;