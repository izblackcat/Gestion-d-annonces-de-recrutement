const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/user-controller');
const candidateController = require('../controllers/candidate-controller');
const recruiterController = require('../controllers/recruiter-controller');

//const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:cid', userController.getUserById);
router.get('/isCorR/:id', userController.isCandidateOrRecruiter);
router.post(
  '/candidate/signup',
  //fileUpload.single('image'),
  [
    check('firstName')
      .not()
      .isEmpty(),
    check('lastName')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(), 
    check('password').isLength({ min: 8 })
  ],
  candidateController.signup
);
router.post(
  '/recruiter/signup',
  //fileUpload.single('image'),
  [
    check('firstName')
      .not()
      .isEmpty(),
    check('lastName')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(), 
    check('password').isLength({ min: 8 })
  ],
  recruiterController.signup
);

router.post('/login', userController.login);


router.patch('/update/:uid',
[
  check('firstName')
    .not()
    .isEmpty(),
  check('lastName')
    .not()
    .isEmpty(),
  check('email')
    .normalizeEmail()
    .isEmail()
], 
userController.updateUser);

router.delete('/delete/:uid', userController.deleteUser);

module.exports = router;
