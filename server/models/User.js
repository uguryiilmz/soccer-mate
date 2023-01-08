

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    team:{
        type:String,
        default:""
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    foot: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: Date.now
    },
    desc: {
      type: String,
      max: 50,
    },
    age: {
      type: Number,
      max: 75,
    },
    captain:{
        type:Boolean,
        default:false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);