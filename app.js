const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const path = require("path");
const methodover = require("method-override");
const mongourl = "mongodb://127.0.0.1:27017/airbnb";
const Listing = require("../Airbnbwebsite/models/listing");
const ejsMate = require("ejs-mate");

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
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(methodover("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.listen(port ,() => {
  console.log(`Started ${port}`);
});
app.get("/", (req, res) => {
  res.send("I am on root");
});
app.get("/listing", async (req, res) => {
  let allist = await Listing.find({});
  res.render("index.ejs", { allist });
});
app.get("/listing/new", (req, res) => {
  res.render("new.ejs");
});
app.get("/listing/:id", async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findById(id);
  res.render("detail.ejs", { list });
});
app.post("/listing", async (req, res) => {
  let newlist = new Listing(req.body.listing);
  await newlist.save();
  res.redirect("/listing");
});
app.get("/listing/:id/edit", async (req, res) => {
  let { id } = req.params;
  let list = await Listing.findById(id);
  res.render("edit.ejs", { list });
});
app.put("/listing/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listing/${id}`);
});
app.delete("/listing/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listing");
});
