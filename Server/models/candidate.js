const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const User = require("./user")


const Candidate = User.discriminator("Candidate",
new Schema({
  phoneNumber: { type: String, required: true },
  CV: { type: String, required: false },
  applications: [{ type: mongoose.Types.ObjectId, required:false, ref:'Application' }]
})
);

//userSchema.plugin(uniqueValidator);

module.exports = { Candidate }