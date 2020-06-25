const imageShop = require("../models/imageShop");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Trip = require("../models/trip");
const path = require("path");
const { Storage } = require("@google-cloud/storage");

const storageId = "storage-281412";
const storageKeyFile = path.join(
  __dirname,
  "../storage-281412-89df25209e91.json"
);
const storage = new Storage({
  projectId: storageId,
  credentials: process.env.GOOGLE_CONFIG
});

// storage.getBuckets().then(x => console.log(x));
const fileBucket = storage.bucket("tablawidoftest");

const createTrip = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Your entered data is incorrect,check it again ", 422)
    );
  }

  let frontFile;
  let backFile;

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
    await imageShop(req.files["frontImage"][0], req.files["backImage"][0]);

    await createdTrip.save();

    frontFile = await fileBucket.upload(
      "./uploads/resized/" + req.files["frontImage"][0].filename
    );
    backFile = await fileBucket.upload(
      "./uploads/resized/" + req.files["backImage"][0].filename
    );
    const url = frontFile[0].metadata.mediaLink;
    const url2 = backFile[0].metadata.mediaLink;
    console.log(url);
    console.log(url2);
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
