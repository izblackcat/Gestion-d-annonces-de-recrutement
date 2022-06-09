const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const User = require("./user")


const Candidate = User.discriminator("Candidate",
new Schema({
  phoneNumber: { type: String, required: true },
  CV: { type: String, required: false },
})
);

//userSchema.plugin(uniqueValidator);

module.exports = { Candidate }