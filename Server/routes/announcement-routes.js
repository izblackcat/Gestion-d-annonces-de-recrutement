const express = require('express');
const { check } = require('express-validator');

const announcementController = require('../controllers/announcement-controller');

//const fileUpload = require('../middleware/file-upload');
const router = express.Router();

router.get('/', announcementController.getAnnouncements);
router.get('/:aid', announcementController.getAnnouncementById);
router.get('/user/:rid', announcementController.getAnnouncementsByRecruiterId);
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
  announcementController.createAnnouncement
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
announcementController.updateAnnouncement);

router.delete('/delete/:aid', announcementController.deleteAnnouncement);

module.exports = router;
