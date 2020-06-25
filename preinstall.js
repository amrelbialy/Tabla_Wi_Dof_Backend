const fs = require("fs");

fs.writeFile(
  "./google-credentials-heroku.json",
  process.env.GOOGLE_CONFIG,
  err => {}
);
//in json
 // "preinstall": "node preinstall.js"