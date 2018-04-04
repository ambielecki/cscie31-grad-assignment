let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let schema = new Schema({
    first_name    : {type : String, required : [true, 'First Name is required']},
    last_name     : {type : String, required : [true, 'Last Name is required']},
    date_of_birth : {type : String, required : [true, 'DOB is required']},
    image_name    : {type : String},
    createdAt     : {type : Date},
    updatedAt     : {type : Date},
});

schema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    // I prefer to have an updatedAt set for the first save as well
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Player', schema);