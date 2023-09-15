const { StatusCodes } = require("http-status-codes");
const Job = require("../models/jobs");
const { BadRequestError, NotFoundError } = require("../errors");
const asyncHandler = require('express-async-handler')

const getAllJobs = asyncHandler(async (req, res) => {
  const job = await Job.find({ initBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ job, count: job.length });
})

const createJob = asyncHandler(async (req, res) => {
  req.body.initBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
  // res.send(req.body)
});

const getJob = asyncHandler(async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({
    _id: jobId,
    initBy: userId,
  });
  if (!job) {
    throw new NotFoundError("No job with id found");
  }
  res.status(StatusCodes.OK).json({ job });
});

const updateJob = asyncHandler(async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (!company || !position) {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, initBy: userId },
    req.body,
    { new: true, runValidators: true}
  );

  
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
});

//upload resume from a file oknown dunkno 
const deleteJob = asyncHandler(async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
      } = req;
    const job = await Job.findByIdAndRemove({_id: jobId, initBy: userId})
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
      }
      res.status(StatusCodes.OK).send();
});

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
