const sharp = require("sharp");

const imageShop = async (frontImage, backImage) => {
  sharp(frontImage.path)
    .resize(500, 500)
    .toFile("./uploads/resized/" + frontImage.filename)
    .then(() => {});

  sharp(backImage.path)
    .resize(500, 500)
    .toFile("./uploads/resized/" + backImage.filename)
    .then(() => {});
};

module.exports = imageShop;
