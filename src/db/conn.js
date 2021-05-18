const mongoose = require("mongoose");

const result = require('dotenv').config()

if (result.error) {
  throw result.error
}

const DB = process.env.DATABASE;
// const DB = "mongodb://localhost:27017/notes"

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection successful.");
  })
  .catch((e) => {
    console.log(e);
  });
