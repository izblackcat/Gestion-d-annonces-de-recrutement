
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const { getToken } = require('./user-controller')

const { Recruiter } = require("../models/recruiter");


const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { firstName, lastName, email, password, image, companyName, phoneNumber, landlinePhone } = req.body;
  
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
  
    const createdRecruiter = new Recruiter({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      image,
      companyName,
      phoneNumber,
      landlinePhone,
      announcements:[]
    });
  
    try {
      await createdRecruiter.save();
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
    res
      .status(201)
      .json(getToken(createdRecruiter.id, createdRecruiter.email));
  };



  exports.signup = signup;