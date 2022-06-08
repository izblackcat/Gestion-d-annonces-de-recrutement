const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/user-controller');
//const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/', userController.getUsers);

router.post(
  '/signup',
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
  userController.signup
);

router.post('/login', userController.login);

module.exports = router;
