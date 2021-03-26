const mongoose = require("mongoose");
const URLSchema = mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortenedUrl: {
    type: String,
    required: true,
    unique: true,
  },
  shortenedUrlCode: {
    type: String,
    required: true,
    unique: true,
  },
  totalClicks: {
    type: Number,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  reviewDate: {
    type: Date,
    default: () => Date.now() + 98 * 24 * 60 * 60 * 1000, //NANO ID Assumes ~99 days needed, in order to have a 1% probability of at least one collision.
  },
  lastClicked: {
    type: Date,
  },
});

module.exports = mongoose.model("URL", URLSchema);

