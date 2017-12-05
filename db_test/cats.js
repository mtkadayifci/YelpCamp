var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app');

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model('Cat', catSchema);

//////////////CREATE NEW ITEM//////////////////////////////////////

// var cat1 = new Cat({ name: 'Portakal', age: 1, temperament: 'Lazy, friendly and he is gonna be fat cat soon.' });

// cat1.save(function(err, cat) {
//     if (err) {
//         console.log('Something went wrong when saving Ponçik.');
//     }
//     else {
//         console.log('We just saved a cat to the db:');
//         console.log(cat);
//     }
// });

////////ANOTHER WAY TO CREATE NEW ITEM/////////////////////////////

// Cat.create({ name: 'Snow White', age: 15, temperament: 'Bland' }, function(err, cat) {
//     if (err) {
//         console.log('An error occured: ' + err);
//     }
//     else {
//         console.log(cat);
//     }
// });

///////////////////////////////////////////////////////////////////

Cat.find({}, function(err, cats) {
    if (err) {
        console.log('Something went wrong!');
        console.log(err);
    }
    else {
        console.log(cats);
    }
})
