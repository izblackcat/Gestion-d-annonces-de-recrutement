//const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Announcement = require('../models/announcement');
const User = require('../models/user');



const getAnnouncements = async (req, res, next) => {
  
  let announcements;
  try {
    announcements = await Announcement.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  console.log(announcements)
  res.json({ annonces: announcements.map(ann => ann.toObject({ getters: true })) });
} 

//TODO: CHANGE THE ID TO BE IMPORTED WITHIN THE REQUEST 
const getAnnouncementById = async (req, res, next) => {
  const announcementId = req.params.aid;

  let announcement;
  try {
    announcement = await Announcement.findById(announcementId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a announcement.',
      500
    );
    return next(error);
  }

  if (!announcement) {
    const error = new HttpError(
      'Could not find announcement for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ announcement: announcement.toObject({ getters: true }) });
};

const getAnnouncementsByRecruiterId = async (req, res, next) => {
  const userId = req.params.rid;

  // let announcements;

  
  let userWithAnnouncements;
  try {
    userWithAnnouncements = await User.findById(userId).populate('announcements');
  } catch (err) {
    const error = new HttpError(
      'Fetching announcements failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!announcements || announcements.length === 0) {
  if (!userWithAnnouncements) {
    return next(
      new HttpError('Could not find announcements for the provided user id.', 404)
    );
  }
  if(userWithAnnouncements.__t === 'Candidate'){
    return next(new HttpError('The provided id is for a candidate not a recruiter'), 400)
  }

  if(userWithAnnouncements.announcements.length === 0){
      res.json({ message:"The user has no announcements yet" })
  }
  else {res.json({
    announcements: userWithAnnouncements.announcements.map(announcement =>
      announcement.toObject({ getters: true })
    )
    });
  }
};

const createAnnouncement = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
 const { title, description, category, status } = req.body;
   
 const userId = req.body.userId
  const createdAnnouncement = new Announcement({
    title,
    description,
    category,
    numberOfCandidates: 0,
    createdAt: Date.now(),
    status,
    creator: userId
  });

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Creating announcement failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdAnnouncement.save({ session: sess });
    user.announcements.push(createdAnnouncement);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating announcement failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ announcement: createdAnnouncement });
};


const updateAnnouncement = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const  { title, description, category, numberOfCandidates, status } = req.body;
  const announcementId = req.params.aid;

  let announcement;
  try {
    announcement = await Announcement.findById(announcementId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update announcement.',
      500
    );
    return next(error);
  }

  if (announcement.creator.toString() !== req.body.userId) {
    const error = new HttpError('You are not allowed to edit this announcement.', 401);
    return next(error);
  }

  announcement.title = title;
  announcement.description = description;
  announcement.category = category;
  announcement.numberOfCandidates = numberOfCandidates;
  announcement.status = status;

  try {
    await announcement.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update announcement.',
      500
    );
    return next(error);
  }

  res.status(200).json({ announcement: announcement.toObject({ getters: true }) });
};

const deleteAnnouncement = async (req, res, next) => {
  const announcementId = req.params.aid;

  let announcement;
  try {
    announcement = await Announcement.findById(announcementId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete announcement.',
      500
    );
    return next(error);
  }

  if (!announcement) {
    const error = new HttpError('Could not find announcement for this id.', 404);
    return next(error);
  }

  if (announcement.creator.id !== req.body.userId) {
    const error = new HttpError(
      'You are not allowed to delete this announcement.',
      401
    );
    return next(error);
  }

  //const imagePath = announcement.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await announcement.remove({ session: sess });
    announcement.creator.announcements.pull(announcement);
    await announcement.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete announcement.',
      500
    );
    return next(error);
  }

//   fs.unlink(imagePath, err => {
//     console.log(err);
//   });

  res.status(200).json({ message: 'Announcement deleted.' });
};


exports.getAnnouncements = getAnnouncements;
exports.getAnnouncementById = getAnnouncementById;
exports.getAnnouncementsByRecruiterId = getAnnouncementsByRecruiterId;
exports.createAnnouncement = createAnnouncement;
exports.updateAnnouncement = updateAnnouncement;
exports.deleteAnnouncement = deleteAnnouncement;
