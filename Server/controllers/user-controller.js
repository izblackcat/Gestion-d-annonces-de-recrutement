const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');


const getUserById = async (req, res, next) => {
  const userId = req.params.cid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a candidate.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      'Could not find user for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};


const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  res.json(getToken(existingUser.id, existingUser.email))
};


const getToken = (id, email) =>{
  let token;
  try {
    token = jwt.sign(
      { userId: id, email: email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  return {
    userId: id,
    email: email,
    token: token
  };

}

const isCandidateOrRecruiter = async (req, res, next) =>{
  const id  = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a candidate.',
      500
    );
    return next(error);
  }
  if(user.__t === 'Candidate'){
    return res.json({'user': 'candidate'})
  }
  else{
    return res.json({'user': 'recruiter'})
  }
}



const updateUser = async (req, res, next) => {
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
  const { firstName, lastName, email, phoneNumber } = req.body;
  if(user.__t === "Candidate"){

    const { CV } = req.body;
    user.CV = CV;
    user.phoneNumber = phoneNumber;
  } else {
    const { companyName, landlinePhone } = req.body;
    user.companyName = companyName;
    user.landlinePhone = landlinePhone;
  }
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }
  const { password, _id, __v, ...userInfo}  = user.toObject({getters:true});
  res.status(200).json(userInfo);
};




const deleteUser = async (req, res, next) => {
  const uid = req.params.uid;

  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for this id.', 404);
    return next(error);
  }

  //const imagePath = place.image;

  try {
    //const sess = await mongoose.startSession();
    //sess.startTransaction();
    await user.remove();
    //place.creator.places.pull(place);
    //await place.creator.save({ session: sess });
   // await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  // fs.unlink(imagePath, err => {
  //   console.log(err);
  // });

  res.status(200).json({ message: 'User deleted.' });
};


exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.login = login;
exports.getToken  = getToken;
exports.isCandidateOrRecruiter = isCandidateOrRecruiter;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
