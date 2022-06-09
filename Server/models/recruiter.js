const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const User = require("./user")

const Recruiter = User.discriminator("Recruiter",
new Schema({
  companyName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  landlinePhone: { type: String, required: true },
  announcements: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Announcement' }]
})
);


//userSchema.plugin(uniqueValidator);

module.exports = { Recruiter };