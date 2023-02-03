

const Notification = require("../models/Notification");
const router = require("express").Router();
const User = require("../models/User");
const Games = require('../models/Games')
const Requests = require('../models/Requests');
const Team = require("../models/Team");



router.post("/:type", async (req, res) => {
        const existing_user = await User.findOne({ _id: req.body.sender_id });

        //get user info
        if(req.params.type==='game'){
            try{
                //create new user
                const newNotification = new Notification({
                    receiver_id: req.body.receiver_id,
                    sender_id: req.body.sender_id,
                    senderName: existing_user.username,
                    text: req.body.text,
                    date:req.body.date,
                    request:{
                        status:'PENDING',
                        location:req.body.location,
                        gameTime:req.body.game_time,
                    }

                });
            
                //save user and respond
                const notification = await newNotification.save();
                res.status(200).json(notification);
                } catch (err) {
                console.log("err is",err)
                res.status(500).json(err)
                }
        }
        else{
            try{
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
        }
    
});


router.put('/games/:id',async(req,res)=>{
    const notification_id = req.params.id;
    try {
        const notification = await Notification.findOne({ _id: notification_id });
        console.log("not",notification)
        const new_notification = JSON.parse(JSON.stringify(notification)); //clone object
        console.log("new not",notification)

        new_notification.request.location=req.body.location
        new_notification.request.gameTime= req.body.game_time
        const response = await Notification.findByIdAndUpdate(notification_id ,
            {$set: new_notification},
            {new:true}        
        );

        console.log("notification",response)
        res.status(200).json(response);
      } catch (err) {
        console.log("err",err)
        res.status(500).json(err);
      }

})


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
router.get("/upcoming_games/:receiver_id",async(req,res)=>{
    console.log("buraya girdi")
    const receiver_id = req.params.receiver_id;
    console.log(receiver_id)
    try {
      var notification=[]
      notification = await Notification.find({ receiver_id:receiver_id, 'request.status' :'Accepted'});
      console.log("first not",notification)
      if (notification.length===0){
        notification = await Notification.find({ sender_id:receiver_id, 'request.status' :'Accepted'});
      }
      if(notification.length>0){
        const receiver_captain_ids=new Set()
        const sender_captain_ids=new Set()
        const receiver_team_info=new Map()
        const sender_team_info=new Map()

        //collect captain ids
        for(const not of notification){
            receiver_captain_ids.add(not.receiver_id)
            sender_captain_ids.add(not.sender_id)
        }

        console.log('receiver',receiver_captain_ids,'sender',sender_captain_ids)

        //receiver teams info
        for(id of Array.from(receiver_captain_ids)){
            const existing_team = await Team.findOne({ captain_id: id });
            console.log("existing team",existing_team)
            if(id in receiver_team_info){
                receiver_team_info[id].push({'team_name':existing_team.team_name,'team_id':existing_team.team_id})
            }else{
                receiver_team_info.set(id,[{'team_name':existing_team.team_name,'team_id':existing_team.team_id}])
            }
        }

        console.log("rec",receiver_team_info)

        //sender teams info
        for(id of Array.from(sender_captain_ids)){
            const existing_team = await Team.findOne({ captain_id: id });
            if(id in receiver_team_info){
                sender_team_info[id].push({'team_name':existing_team.team_name,'team_id':existing_team.team_id})
            }else{
                sender_team_info.set(id,[{'team_name':existing_team.team_name,'team_id':existing_team.team_id}])
            }
        }

        console.log("sender",sender_team_info)

        var final_list=[]
        //connect
        for(const not of notification){
            console.log("item",not)
            var newObj = JSON.parse(JSON.stringify(not)); //clone object

            if(receiver_team_info.has(not.receiver_id )){
                console.log("evet",not.receiver_id,receiver_team_info.get(not.receiver_id))
                // merger_of_sender_receiver= Object.assign({}, {'receiver_team_info': receiver_team_info.get(not.receiver_id)});
                newObj.receiver_team_info=receiver_team_info.get(not.receiver_id)

            }
            if(sender_team_info.has(not.sender_id )){


                console.log("gonderici",not.sender_id)
                // let sender_data= Object.assign({}, {'sender_team_info': sender_team_info.get(not.sender_id)})
                newObj.sender_team_info=sender_team_info.get(not.sender_id)
                
                console.log("new obj",newObj)


                // Object.assign(merger_of_sender_receiver, sender_data);
                final_list.push(newObj)
            }
        }

      }
      console.log("EN SON FINAL",final_list)
      res.status(200).json(final_list);
    } catch (err) {
      console.log("err",err)
      res.status(500).json(err);
    }
})


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


            console.log("existing notification",existing_notification)

            if(req.body.status==='ACCEPT'){

                
                //create new user
                const newRequest = {
                    game_id:"game_id"+notification_id,
                    status:"Accepted",
                    gameTime:existing_notification.request.gameTime,
                    location:existing_notification.request.location
                };
        
                existing_notification.request=newRequest
        

        
            }else{    
                    
                    //create new user
                    const newRequest = {
                        game_id:"game_id"+notification_id,
                        status:"Rejected",
                        date:'2020'
                    };
            
                    existing_notification.request=newRequest
            
        
            }

            try{

                const new_notification = await Notification.findByIdAndUpdate(notification_id, {
                    $set: existing_notification},
                    {new:true}
                );

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