//const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Application = require('../models/application');
const Announcement = require('../models/announcement')
const User = require('../models/user');


const getApplications = async (req, res, next) => {
  let applications;
  try {
    applications = await Application.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ annonces: applications.map(ann => ann.toObject({ getters: true })) });
} 


const getApplicationById = async (req, res, next) => {
  const applicationId = req.params.aid;

  let application;
  try {
    application = await Application.findById(applicationId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find an application.',
      500
    );
    return next(error);
  }

  if (!application) {
    const error = new HttpError(
      'Could not find application for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ application: application.toObject({ getters: true }) });
};

const getApplicationsByAnnouncementId = async (req, res, next) => {
  const announcementId = req.params.aid;

  // let applications;

  
  let annoucementWithApplications;
  try {
    annoucementWithApplications = await Announcement.findById(announcementId).populate('applications');
  } catch (err) {
    const error = new HttpError(
      'Fetching applications failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!applications || applications.length === 0) {
  if (!annoucementWithApplications) {
    return next(
      new HttpError('Could not find applications for the provided announcement id.', 404)
    );
  }

  if(annoucementWithApplications.applications.length === 0){
      res.json({ message:"The announcement has no applications yet" })
  }
  else {
    res.json({
    applications: annoucementWithApplications.applications.map(application =>
      application.toObject({ getters: true })
    )
    });
  }
};

const getApplicationsByCandidateId = async (req, res, next) => {
  const candidateId = req.params.cid;

  
  let annoucementWithApplications;
  try {
    candidateWithApplications = await User.findById(candidateId).populate('applications');
  } catch (err) {
    const error = new HttpError(
      'Fetching applications failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!applications || applications.length === 0) {
  if (!candidateWithApplications) {
    return next(
      new HttpError('Could not find applications for the provided candidate id.', 404)
    );
  }

  if(candidateWithApplications.applications.length === 0){
      res.json({ message:"The announcement has no applications yet" })
  }
  else {
    res.json({
    applications: candidateWithApplications.applications.map(application =>
      application.toObject({ getters: true })
    )
    });
  }
};

const createApplication = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
 //const { review } = req.body;
  
  const createdApplication = new Application({
    announcement: req.body.announcementId,
    candidate: req.params.userId
  });

  let candidate;
  try {
    candidate = await User.findById(req.params.userId);
  } catch (err) {
    const error = new HttpError(
      'Creating application failed, please try again.',
      500
    );
    return next(error);
  }

  if (!candidate) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }
  if(candidate.__t !== 'Candidate'){
      return next(new HttpError('Operation failed. Only users with candidate account can apply'))
  }

  let announcement;
  try {
    announcement = await Announcement.findById(req.body.announcementId);
  } catch (err) {
    const error = new HttpError(
      'Creating application failed, please try again.',
      500
    );
    return next(error);
  }

  if (!announcement) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdApplication.save({ session: sess });
    candidate.applications.push(createdApplication);
    await candidate.save({ session: sess });
    announcement.applications.push(createdApplication);
    await announcement.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating application failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ application: createdApplication });
};


const updateApplication = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const  { review } = req.body;
  const applicationId = req.params.aid;

  let application;
  try {
    application = await Application.findById(applicationId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update application.',
      500
    );
    return next(error);
  }

  if (application.candidate.toString() !== req.body.userId) {
    const error = new HttpError('You are not allowed to edit this application.', 401);
    return next(error);
  }

  application.review = review;

  try {
    await application.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update application.',
      500
    );
    return next(error);
  }

  res.status(200).json({ application: application.toObject({ getters: true }) });
};

const deleteApplication = async (req, res, next) => {
  const applicationId = req.params.aid;

  let application;
  try {
    application = await Application.findById(applicationId).populate([ 'candidate', 'announcement' ]);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete application.',
      500
    );
    return next(error);
  }

  if (!application) {
    const error = new HttpError('Could not find application for this id.', 404);
    return next(error);
  }

  if (application.candidate.id !== req.body.userId) {
    const error = new HttpError(
      'You are not allowed to delete this application.',
      401
    );
    return next(error);
  }

  //const imagePath = application.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await application.remove({ session: sess });
    application.candidate.applications.pull(application);
    await application.candidate.save({ session: sess });
    application.announcement.applications.pull(application);
    await application.announcement.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete application.',
      500
    );
    return next(error);
  }

//   fs.unlink(imagePath, err => {
//     console.log(err);
//   });

  res.status(200).json({ message: 'application deleted.' });
};


exports.getApplications = getApplications;
exports.getApplicationById = getApplicationById;
exports.getApplicationsByAnnouncementId = getApplicationsByAnnouncementId;
exports.getApplicationsByCandidateId = getApplicationsByCandidateId;
exports.createApplication = createApplication;
exports.updateApplication = updateApplication;
exports.deleteApplication = deleteApplication;
