

const Notification = require("../models/Notification");
const router = require("express").Router();
const User = require("../models/User");
const Games = require('../models/Games')
const Requests = require('../models/Requests')



//update user
router.post("/", async (req, res) => {
    try {
        //generate new password

        //get user info

        const existing_user = await User.findOne({ _id: req.body.sender_id });

    
        //create new user
        const newNotification = new Notification({
          receiver_id: req.body.receiver_id,
          sender_id: req.body.sender_id,
          senderName: existing_user.username,
          text: req.body.text,
          date:req.body.date
        });
    
        //save user and respond
        const notification = await newNotification.save();
        res.status(200).json(notification);
      } catch (err) {
        console.log("err is",err)
        res.status(500).json(err)
      }
});


//get sent notifications for the receiver
router.get("/:receiver_id", async (req, res) => {
  const receiver_id = req.params.receiver_id;
  console.log(receiver_id)
  try {
    const notification = await Notification.find({ receiver_id: receiver_id });
    // console.log("receiver",notification)
    res.status(200).json(notification);
  } catch (err) {
    console.log("err",err)
    res.status(500).json(err);
  }
});


//get request responses
router.get("/")


//update the notification when the game request accepted/denied
router.put("/:notification_id", async (req, res) => {
    try {
        const notification_id = req.params.notification_id

        // console.log("noti",notification_id)


        if(req.body.isRead){
            // console.log("hiya",req.body.isRead)
            const is_read=req.body.isRead
            const new_notification = await Notification.findByIdAndUpdate(notification_id, {
                $set: {is_read:is_read},
              });
              res.status(200).json('FIELDS ARE UPDATED');
              return
        }else{
            const existing_notification = await Notification.findOne({ _id:notification_id });

            if(req.body.status==='ACCEPT'){

                // console.log("existing before",existing_notification)
                
                //create new user
                const newRequest = {
                    game_id:"game_id"+notification_id,
                    status:"Accepted",
                    date:'2020'
                };
        
                existing_notification.request=newRequest
        
                // console.log("existing notification is",existing_notification)
    
                // console.log("noti id",notification_id)

        
            }else{    
                    // console.log("existing before",existing_notification)
                    
                    //create new user
                    const newRequest = {
                        game_id:"game_id"+notification_id,
                        status:"Rejected",
                        date:'2020'
                    };
            
                    existing_notification.request=newRequest
            
                    // console.log("existing notification is",existing_notification)
        
                    // console.log("noti id",notification_id)
        
            }

            try{

                const new_notification = await Notification.findByIdAndUpdate(notification_id, {
                    $set: existing_notification},
                    {new:true}
                );

                // console.log("new notifi",new_notification)
                res.status(200).json(new_notification)
            }catch(e){
                res.status(500).json(e)
            }


            return
        }
        //save user and respond
      } catch (err) {
        console.log("err is",err)
        res.status(500).json(err)
      }
});

module.exports = router;