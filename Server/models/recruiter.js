const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const User = require("./user")

const recruiterSchema = User.discriminator("Recruiter",
new Schema({
  companyName: { type: String, required: false },
  phoneNumber: { type: String, required: true },
  landlinePhone: { type: String, required: true }
})
);


//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Candidate',candidateSchema);