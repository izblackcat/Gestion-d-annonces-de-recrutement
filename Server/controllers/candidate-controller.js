//const fs = require('fs');

const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const { getToken } = require('./user-controller')
const { Candidate }= require('../models/candidate');


const signup = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { firstName, lastName, email, password, phoneNumber } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email } );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  const createdCandidate = new Candidate({
    firstName,
    lastName,
    password: hashedPassword,
    email,
    phoneNumber
  });

  try {
    await createdCandidate.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  res
    .status(201)
    .json(getToken(createdCandidate.id, createdCandidate.email, createdCandidate.__t));
};

const updateCv = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const uid = req.params.uid;

  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update user info.',
      500
    );
    return next(error);
  }

  if(!user.__t){
    return next(new HttpError('The provided id doesnt belong to no user'), 404);
  }
  const CV  = req.file.path;
  user.CV = CV;
    
  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update user .',
      500
    );
    return next(error);
  }
  const { password, _id, __v, ...userInfo}  = user.toObject({getters:true});
  res.status(200).json(userInfo);
};


exports.signup = signup;
exports.updateCv = updateCv;
