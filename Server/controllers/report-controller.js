
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Report = require('../models/report');
const Announcement = require('../models/announcement')
const User = require('../models/user');





const getReports = async (req, res, next) => {
  let reports;
  try {
    reports = await Report.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ reports: reports.map(ann => ann.toObject({ getters: true })) });
} 


const getReportById = async (req, res, next) => {
  const reportId = req.params.rid;

  let report;
  try {
    report = await Report.findById(reportId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a report.',
      500
    );
    return next(error);
  }

  if (!report) {
    const error = new HttpError(
      'Could not find report for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ report: report.toObject({ getters: true }) });
};

const getReportsByAnnouncementId = async (req, res, next) => {
  const announcementId = req.params.aid;

  // let reports;

  
  let annoucementWithReports;
  try {
    annoucementWithReports = await Announcement.findById(announcementId).populate('reports');
  } catch (err) {
    const error = new HttpError(
      'Fetching reports failed, please try again later.',
      500
    );
    return next(error);
  }

  // if (!reports || reports.length === 0) {
  if (!annoucementWithReports) {
    return next(
      new HttpError('Could not find reports for the provided announcement id.', 404)
    );
  }

  if(annoucementWithReports.reports.length === 0){
      res.json({ message:"The announcement has no reports " })
  }
  else {
    res.json({
    reports: annoucementWithReports.reports.map(report =>
      report.toObject({ getters: true })
    )
    });
  }
};


const createReport = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const userId = req.params.uid;
  const { report, additionalInformation } = req.body;
  const createdReport = new Report({
    report,
    additionalInformation,
    announcement: req.body.announcementId
    });
  
  if(userId){
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new HttpError(
        'Creating report failed, please try again.',
        500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id.', 404);
        return next(error);
    }
    createReport.reporter = userId;
  }


  let announcement;
  try {
    announcement = await Announcement.findById(req.body.announcementId);
  } catch (err) {
    const error = new HttpError(
      'Creating report failed, please try again.',
      500
    );
    return next(error);
  }

  if (!announcement) {
    const error = new HttpError('Could not find announcement for provided id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdReport.save({ session: sess });
    announcement.reports.push(createdReport);
    await announcement.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating report failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ report: createdReport });
};




const deleteReport = async (req, res, next) => {
  const reportId = req.params.rid;

  let report;
  try {
    report = await Report.findById(reportId).populate('announcement');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete report.',
      500
    );
    return next(error);
  }

  if (!report) {
    const error = new HttpError('Could not find report for this id.', 404);
    return next(error);
  }


  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await report.remove({ session: sess });
    report.announcement.reports.pull(report);
    await report.announcement.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete report.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'report deleted.' });
};


exports.getReports = getReports;
exports.getReportById = getReportById;
exports.getReportsByAnnouncementId = getReportsByAnnouncementId;
exports.createReport = createReport;
exports.deleteReport = deleteReport;
