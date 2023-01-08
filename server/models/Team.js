

const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    team_id: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    captain_id: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    location: {
      type: String,
      required: true,
      min: 6,
    },
    founded: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);