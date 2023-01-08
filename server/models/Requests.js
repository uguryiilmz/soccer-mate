

const mongoose = require("mongoose");

const RequestsSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      require: true,
      default :"PENDING",
    },
    game_id: {
      type: String,
      default:null
    },
  },
  { timestamps: true }
);

exports.RequestSchema= RequestsSchema

