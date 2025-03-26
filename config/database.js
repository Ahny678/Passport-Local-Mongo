//DB CONNECTION
require("dotenv").config();
const mongoose = require("mongoose");
const monCon = mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to mongodb:", err);
  });
//-----------

module.exports.monCon;
