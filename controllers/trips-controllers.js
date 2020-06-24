const fs = require("fs");

const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Trip = require("../models/trip");

const createTrip = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Your entered data is incorrect,check it again ", 422)
    );
  }

  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    opinion,
    destination
  } = req.body;

  const createdTrip = new Trip({
    firstName,
    lastName,
    phoneNumber,
    email,
    opinion,
    destination,
    frontImage: req.files["frontImage"][0].path,
    backImage: req.files["backImage"][0].path
  });

  try {
    await createdTrip.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Saving your information failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    trip: createdTrip
  });
};

exports.createTrip = createTrip;
