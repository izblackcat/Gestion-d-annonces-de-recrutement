const express = require('express');
const { check } = require('express-validator');

const applicationController = require('../controllers/application-controller');

//const fileUpload = require('../middleware/file-upload');
const router = express.Router();

router.get('/', applicationController.getApplications);
router.get('/:aid', applicationController.getApplicationById);
router.get('/user/:cid', applicationController.getApplicationsByCandidateId);
router.get('/announcement/:aid', applicationController.getApplicationsByAnnouncementId);
router.post(
  '/new/:userId',
  //fileUpload.single('image'),
//   [
//     check('firstName')
//       .not()
//       .isEmpty(),
//     check('lastName')
//       .not()
//       .isEmpty(),
//     check('email')
//       .normalizeEmail()
//       .isEmail(), 
//     check('password').isLength({ min: 8 })
//   ],
  applicationController.createApplication
);


router.patch('/update/:aid',
// [
//   check('firstName')
//     .not()
//     .isEmpty(),
//   check('lastName')
//     .not()
//     .isEmpty(),
//   check('email')
//     .normalizeEmail()
//     .isEmail()
// ], 
applicationController.updateApplication);

router.delete('/delete/:aid', applicationController.deleteApplication);

module.exports = router;
