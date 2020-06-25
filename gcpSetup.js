const fs = require("fs");

fs.writeFile(
  process.env.GCP_KEY_FILE,
  process.env.GOOGle_APPLICATION_CREDENTIALS,
  err => {
    console.log(err);
  }
);
