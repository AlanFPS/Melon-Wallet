const { model, Schema } = require("mongoose");

const roomSchema = new Schema({
  name: { type: String },
  description: { type: String },
  imageUrl: {
    type: String,
    default:
      "https://imgs.search.brave.com/irTRxB9BaNmIP5GmaHSpRcmyLg72HmBFSIYcOpftbKk/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9tZWRp/YS5hcmNoaXRlY3R1/cmFsZGlnZXN0LmNv/bS9waG90b3MvNTY3/ODk5NzY3ZmQ5YTU4/OTc4YjdjMzk4L21h/c3Rlci9wYXNzL3Ro/ZS1wZXJmZWN0LWd1/ZXN0LXJvb20tMDUu/anBlZw",
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }], // we will update this field a bit later when we create review model
});

const Room = model("Room", roomSchema);

module.exports = Room;
