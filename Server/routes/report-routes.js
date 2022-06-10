const express = require('express');
const { check } = require('express-validator');

const reportController = require('../controllers/report-controller');

//const fileUpload = require('../middleware/file-upload');
const router = express.Router();

router.get('/', reportController.getReports);
router.get('/:rid', reportController.getReportById);
router.get('/announcement/:aid', reportController.getReportsByAnnouncementId);
router.post('/new', reportController.createReport);
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
  reportController.createReport
);

router.delete('/delete/:rid', reportController.deleteReport);

module.exports = router;
