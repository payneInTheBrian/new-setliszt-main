const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  songName: {
    type: String,
    required: true,
  },
  bandName: {
    type: String,
    required: true,
  },
  songKey: {
    type: String,
    required: true,
  },
  BPM: {
    type: String,
    required: true,
  },
  /* tab: {
    type: String,
    required: true,
  }, */
  /* image: {
    type: String,
    require: true,
  }, */
  cloudinaryId: {
    type: String,
    require: true,
  },
  /* caption: {
    type: String,
    required: true,
  }, */
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bookmarks: {
    type: Array,
    required: true,
    timeAdded: Date.now,
    position: Number,
    
  },
});

module.exports = mongoose.model("Post", PostSchema);
