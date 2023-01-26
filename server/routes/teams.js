

const User= require('../models/User')
const Team = require("../models/Team");
const router = require("express").Router();

//update user
router.post("/:id", async (req, res) => {
    console.log("req body",req.body,"id",req.params.id)

    const captain = await User.findOne({ _id: req.params.id });


    const { teamName,location}=req.body.teamFields

    //captain update
    const user = await User.findByIdAndUpdate(captain._id, {
        $set: { 'team_id': teamName+'_id', 'captain':true} },
        {new:true}
        );        

    const emailsOfSelectedPlayers = req.body.emailsOfSelectedPlayers

    for(let i in emailsOfSelectedPlayers){
        console.log("email is",emailsOfSelectedPlayers[i])
        const user = await User.findByIdAndUpdate(emailsOfSelectedPlayers[i], {
            $set: { 'team_id': teamName+'_id'} },
            {new:true}
          );        
    }

    try {
    
        //create new user
        const newTeam = new Team({
          team_id: teamName +'_id',
          team_name:teamName,
          captain_id: captain._id,
          captain_name: captain.fullName,
          location: location,
          founded:''
        });
    
        //save user and respond
        const team = await newTeam.save();
        res.status(200).json(team);
      } catch (err) {
        console.log("err is",err)
        res.status(500).json(err)
      }
});


router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    console.log("team",teams)
    res.status(200).json(teams);
  } catch (err) {
    console.log("err",err)
    res.status(500).json(err);
  }
});



router.get("/:team_id", async (req, res) => {
    try {
      const team_id=req.params.team_id
      const users = await User.find({team_id:team_id})
      res.status(200).json(users);
    } catch (err) {
      console.log("err",err)
      res.status(500).json(err);
    }
  });


//get sent notifications for the receiverp
router.put("/:team_id", async (req, res) => {
    try {
        const team_id = req.params.team_id
        const team = await Team.findByIdAndUpdate(team_id, {
          $set:req.body},
          {new:true}
        );
        console.log("team is",team)

        res.status(200).json(team);
      } catch (err) {
        console.log('err',err)
        return res.status(500).json(err);
      }
  });
  
module.exports = router;