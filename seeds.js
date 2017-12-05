var mongoose = require('mongoose'),
    faker = require('faker'),
    Campground = require("./models/campground"),
    Comment = require("./models/comment")

var data = [{
        name: "A Beatiful Snake's Rest",
        image: "https://images.unsplash.com/photo-1511139397191-3f003eb28538?auto=format&fit=crop&w=1277&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: faker.lorem.paragraphs(10)
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: faker.lorem.paragraphs(15)
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: faker.lorem.paragraphs(20)
    },
    {
        name: "Bolu Yedi Göller",
        image: "https://images.unsplash.com/photo-1500367215255-0e0b25b396af?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: faker.lorem.paragraphs(17)
    },
    {
        name: "Bolu Abant Gölü",
        image: "https://images.unsplash.com/photo-1444124818704-4d89a495bbae?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: faker.lorem.paragraphs(9)
    },
    {
        name: "Muğla Köyceğiz Gölü",
        image: "https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a?auto=format&fit=crop&w=1267&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: faker.lorem.paragraphs(13)
    }
]

function seedDB() {
    Campground.remove({}, function(err) {
        if (err)
            console.log(err);
        else
            console.log('removed campgrounds!');

        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err)
                    console.log(err);
                else
                    console.log('a campground added.');
                Comment.create({
                    text: faker.lorem.paragraphs(2),
                    author: faker.name.findName()
                }, function(err, comment) {
                    console.log('a comment added to campgroud.');
                    campground.comments.push(comment);
                    campground.save();
                })
            })
        })
    });

};

module.exports = seedDB;
