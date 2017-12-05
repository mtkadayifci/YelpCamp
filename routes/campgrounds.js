var express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground'),
    middleware = require('../middleware/index')

//ADD CAMPGROUND
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new.ejs');
});

router.post('/', middleware.isLoggedIn, function(req, res) {
    var newCampground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
        author: { id: req.user._id, username: req.user.username }
    };
    Campground.create(newCampground, function(err, campground) {
        if (err)
            console.log('An error occured: ' + err);
        else {
            console.log('Campground created.');
        }
    });
    res.redirect('/campgrounds');
});


//GET CAMPGROUND
router.get('/', function(req, res) {

    Campground.find({}, function(err, allCampgrounds) {
        if (err)
            console.log(err);
        else
            res.render('campgrounds/index', { campgrounds: allCampgrounds });
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    Campground.findById(id).populate('comments')
        .exec(function(err, campground) {
            if (err)
                console.log('An error occured: ' + err);
            else {
                res.render('campgrounds/show', { campground: campground });
            }
        });
});


//EDIT CAMPGROUND
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        }
        res.render('campgrounds/edit', { campground: campground });
    });
});

router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
        if (err) {
            console.log('an error occured when updating the campground. error: ' + err);
            res.redirect('/campgrounds/' + req.params.id + '/edit');
        }
        res.redirect('/campgrounds/' + req.params.id);
    });
});


//DELETE CAMPGROUND
router.delete('/:id/', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/campgrounds');
    })
});


module.exports = router;
