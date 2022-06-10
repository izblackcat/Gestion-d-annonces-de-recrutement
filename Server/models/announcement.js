const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;



const announcementSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true},
  numberOfCandidates: { type: Number, required: true},
  createdAt: { type: Date, default: Date.now() },
  status: { type: String, required: true, default: 'ACTIVE'},
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'Recruiter' },
  applications: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Application' }],
  reports: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Report' }]
})


//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Announcement', announcementSchema);