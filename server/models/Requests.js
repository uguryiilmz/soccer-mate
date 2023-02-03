

const mongoose = require("mongoose");

const RequestsSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      require: true,
      default :"PENDING",
    },
    location:{
        type:String,
        require:true,
        default:''
    },
    gameTime:{
        type:Date,
        require:true,
    },
    game_id: {
      type: String,
      default:null
    },
  },
  { timestamps: true }
);

exports.RequestSchema= RequestsSchema

