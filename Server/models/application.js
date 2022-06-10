const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const applicationSchema = new Schema({
    review: { type: Number, enum: [1,2,3,4,5], required: false},
    announcement: { type: mongoose.Types.ObjectId, required: true, ref: 'Announcement'},
    candidate: { type: mongoose.Types.ObjectId, required: true, ref: 'Candidate' }
})


//userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Application', applicationSchema)