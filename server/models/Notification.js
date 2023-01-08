

const mongoose = require("mongoose");

const RequestsSchema = require("./Requests");

const NotificationSchema = new mongoose.Schema(
  {
    sender_id: {
      type: String,
      require: true,
    },
    receiver_id: {
      type: String,
      required: true,
    },
    senderName:{
        type:String,
        required:true
    },
    date: {
      type: String,
      required: true,
      default: Date.now(),
    },
    text: {
        type: String,
        required: true,
    },
    is_read:{
        type:Boolean,
        default:false
    },
    request:{
        type:RequestsSchema,
        default:
        {status: 'PENDING'},
        }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notifications", NotificationSchema);