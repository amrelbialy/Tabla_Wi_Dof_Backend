const express = require("express");
const { check } = require("express-validator");

const tripsControllers = require("../controllers/trips-controllers");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

// router.get('/:tid', placesControllers.getPlaceById);

router.post(
  "/",
  fileUpload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 }
  ]),
  [
    check("firstName")
      .not()
      .isEmpty(),
    check("lastName")
      .not()
      .isEmpty(),
    check("destination")
      .not()
      .isEmpty(),
    check("opinion")
      .not()
      .isEmpty(),
    check("email")
      .normalizeEmail()
      .isEmail(),
    check("phoneNumber")
      .isLength({
        min: 10,
        max: 11
      })
      .isMobilePhone("ar-EG")
  ],
  tripsControllers.createTrip
);

module.exports = router;
