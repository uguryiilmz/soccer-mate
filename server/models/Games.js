

const mongoose = require("mongoose");

const GamesSchema = new mongoose.Schema(
  {
    game_id: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Games", GamesSchema);