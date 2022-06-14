const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    report:{ type: String, required: false, default:5},
    additionalInformation: { type:String, required: false, default:"No additional info"},
    reporter: { type: mongoose.Types.ObjectId, required: false, ref:'User'},
    announcement: { type: mongoose.Types.ObjectId, required: true, ref:'Announcement'}
})

//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Report',reportSchema)