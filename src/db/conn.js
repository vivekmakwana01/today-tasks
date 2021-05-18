const mongoose = require("mongoose");

const result = require("dotenv").config();

if (result.error) {
  throw result.error;
}

const DB = process.env.DATABASE;

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
