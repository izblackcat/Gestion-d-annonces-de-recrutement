const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    report:{ type: String, enum:[
    "",
    "",
    "",
    "",
    ],
    required: true},
    additionalInformation: { type:String, required: false}
})

//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Report',reportSchema)