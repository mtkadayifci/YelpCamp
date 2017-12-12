var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('./models/user.js'),
    seedDB = require("./seeds.js"),
    methodOverride = require("method-override"),
    flash = require('connect-flash')

var campgroundsRoutes = require('./routes/campgrounds'),
    commentsRoutes = require('./routes/comments'),
    indexRoutes = require('./routes/index');

mongoose.Promise = global.Promise;
//export DATABASEURL=mongodb://localhost/yelpcamp
mongoose.connect(process.env.DATABASEURL, { useMongoClient: true });

//seedDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require('express-session')({
    secret: 'lorem ipsum dolor sit amet',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/comments', commentsRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log('server is listening on ' + process.env.IP + ':' + process.env.PORT);
});
