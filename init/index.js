const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initdata = require("./data.js");
const mongourl = "mongodb://127.0.0.1:27017/airbnb";

main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(mongourl);
}

const initdb = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initdata.data);
  console.log("saved");
  
};
initdb();
