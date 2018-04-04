let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let schema = new Schema({
    username  : {type : String, required : true},
    password  : {type : String, required : true},
    type      : {type : String},
    createdAt : {type : Date},
    updatedAt : {type : Date},
});

schema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    // I prefer to have an updatedAt set for the first save as well
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('User', schema);