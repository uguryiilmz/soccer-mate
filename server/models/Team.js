

const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    team_id: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique:true
    },
    team_name:{
        type:String,
        require:true
    },
    captain_id: {
      type: String,
      required: true,
      max: 50,
    },
    captain_name:{
        type:String,
        required:true
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