

const Team = require("../models/Team");
const router = require("express").Router();

//update user
router.post("/", async (req, res) => {
    try {
    
        //create new user
        const newTeam = new Team({
          team_id: req.body.team_id,
          captain_id: req.body.captain_id,
          location: req.body.location,
          founded:req.body.founded
        });
    
        //save user and respond
        const team = await newTeam.save();
        res.status(200).json(team);
      } catch (err) {
        console.log("err is",err)
        res.status(500).json(err)
      }
});


//get sent notifications for the receiverp
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

module.exports = router;