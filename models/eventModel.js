let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let schema = new Schema({
    date        : {type : String, required : [true, 'Date is required']},
    time        : {type : String, required : [true, 'Time is required']},
    location    : {type : String},
    type        : {type : String, required : [true, 'Type is required']},
    title       : {type : String, required : [true, 'Title is required']},
    description : {type : String},
    createdAt   : {type : Date},
    updatedAt   : {type : Date},
});

schema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    // I prefer to have an updatedAt set for the first save as well
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('Event', schema);