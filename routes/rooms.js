var express = require("express");
const req = require("express/lib/request");
const { resource } = require("../app");
var router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Room = require("../models/Room.model");
const Review = require("../models/Review.model");
const isNotOwner = require("../middleware/isNotOwner");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/create", isLoggedIn, function (req, res, next) {
  res.render("create-room");
});

router.post("/create", isLoggedIn, function (req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.render("create-room", { message: "please fill out all fields" });
  }

  Room.create({
    name: req.body.name,
    description: req.body.description,
    owner: req.session.user._id,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log("Failed");
      res.render("create-room", {
        message: "something went wrong creating a room",
      });
    });
});

router.get("/all", (req, res) => {
  Room.find()
    .populate({
      path: "reviews",
      populate: {
        path: "user",
      },
    })
    .then((allRooms) => {
      console.log("All Rooms", allRooms[0].reviews);
      res.render("all-rooms", { allRooms: allRooms });
    })
    .catch((err) => {
      console.log("Failed", err.message);
      res.redirect("/");
    });
});

router.get("/my-rooms", isLoggedIn, (req, res) => {
  Room.find({ owner: req.session.user._id })
    .then((allRooms) => {
      res.render("my-rooms", { allRooms: allRooms });
    })
    .catch((err) => {
      console.log("Failed", err.message);
      res.redirect("/");
    });
});

router.get("/:id/edit", isLoggedIn, (req, res) => {
  Room.findById(req.params.id)
    .then((foundRoom) => {
      res.render("edit-room", { foundRoom: foundRoom });
    })
    .catch((error) => {
      console.log("failed", error.message);
    });
});

router.post("/:id/edit", isLoggedIn, (req, res) => {
  Room.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
  })
    .then(() => {
      res.redirect("/rooms/my-rooms");
    })
    .catch(() => {
      res.redirect("/rooms/my-rooms");
    });
});

router.post("/:id/delete", isLoggedIn, (req, res) => {
  Room.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/rooms/my-rooms");
    })
    .catch(() => {
      res.redirect("/rooms/my-rooms");
    });
});

router.get("/:id/add-review", isLoggedIn, isNotOwner, (req, res) => {
  Room.findById(req.params.id)
    .then((foundRoom) => {
      res.render("add-review", { foundRoom: foundRoom });
    })
    .catch(() => {
      res.redirect("/");
    });
});

router.post("/:id/add-review", isLoggedIn, isNotOwner, (req, res) => {
  //We have to create a new Review
  //We have to tie the User's ID to the Review
  //We have to add that ID to the Room
  Review.create({
    user: req.session.user._id,
    comment: req.body.comment,
  })
    .then((createdReview) => {
      //add createdReview._id to Room
      Room.findByIdAndUpdate(req.params.id, {
        $push: { reviews: createdReview._id },
      })
        .then((results) => {
          res.redirect("/rooms/all");
        })
        .catch((err) => {
          res.json(err.message);
        });
    })
    .catch((err) => {
      console.log("Failed to create comment", err.message);
      res.json(err.message);
    });
});

module.exports = router;
