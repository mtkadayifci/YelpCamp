var express = require('express'),
    router = express.Router({ mergeParams: true }),
    Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    faker = require('faker'),
    middleware = require("../middleware/index")


router.get('/new', middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err)
            console.log(err);
        else {
            res.render('comments/new', { campground: campground, dummyComment: faker.lorem.sentences(), dummyAuthor: faker.name.findName() });
        }
    })

});

router.post('/', middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log('an error occured when getting the campground. error: ' + err);
            res.redirect('/campgrounds');
        }
        else {
            Comment.create(req.body.comment, function(err, addedComment) {
                if (err) {
                    console.log('an error occured when creating the comment. error: ' + err);
                    req.flash("error", "An error occured when creating the comment.");
                }
                else {
                    addedComment.author.id = req.user._id;
                    addedComment.author.username = req.user.username;
                    addedComment.save();
                    campground.comments.push(addedComment);
                    campground.save();
                    req.flash("success", "Comment succesfuly added.");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});


// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        }
        else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        }
    });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        }
        else {
            req.flash("success", "Comment succesfuly updated.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        }
        else {
            req.flash("success", "Comment succesfuly deleted.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;
