let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let schema = new Schema({
    title      : {type : String, required : [true, 'Post Title Is Required']},
    content    : {type : String, required : [true, 'Post Content Is Required']},
    lead_image : {type : String},
    createdAt  : {type : Date},
    updatedAt  : {type : Date},
});

schema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    // I prefer to have an updatedAt set for the first save as well
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Post', schema);