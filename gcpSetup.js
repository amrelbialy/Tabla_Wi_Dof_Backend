const fs = require("fs");

fs.writeFile(
  process.env.GCP_KEY_FILE,
  process.env.GOOle_APPLICATION_CREDENTIALS,
  err => {
    console.log(err);
  }
);
