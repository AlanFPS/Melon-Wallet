const Room = require("../models/Room.model");

const isNotOwner = (req, res, next) => {
  Room.findById(req.params.id)
    .populate("owner")
    .then((foundRoom) => {
      if (foundRoom.owner._id.toHexString() !== req.session.user._id) {
        next();
      } else {
        res.render("index", {
          message: "You cannot add reviews to your own listing",
        });
      }
    });
};

module.exports = isNotOwner;
