const mongoose = require("mongoose");

const SetlistSchema = new mongoose.Schema({
  
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
});

module.exports = mongoose.model("Setlist", SetlistSchema);
