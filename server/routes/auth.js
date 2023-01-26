

const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if(req.file){
        cb(null, "../client/public/uploads");

      }
    },
    filename: (req, file, cb) => {
      console.log("req body",req.file)
      if(req.file){
        cb(null, String(file.originalname));
      }
    },
  });
  
const upload = multer({ storage: storage });

//REGISTER
router.post("/register", upload.single("profilePicture"), async (req, res) => {
    try {

        console.log("req file is",req.file)

        console.log('request is',req.body)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        let filename=''

        if(req.file) filename=req.file.originalname
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            position:req.body.position,
            address:req.body.address,
            foot:req.body.foot,
            fullName:req.body.fullName,
            dateOfBirth:req.body.dateOfBirth,
            profilePicture:filename,
            age:req.body.age,
            team:req.body.teamId

        });

        console.log('newUser',newUser)

        const existingUser = await User.findOne({ email: req.body.email });
        if(existingUser){
            res.status(500).json({"errorMessage":"User Already Exists"});
            return
        }

        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        console.log("err is",err)
        res.status(500).json({"errorMessage":err})
    }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
        console.log("hi")
        res.status(404).json("user not found");
        return
    }

    console.log("user password",user.password)

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    console.log("compare",req.body.password,user.password)
    if(!validPassword){
        console.log("hello wrong pass")
        res.status(400).json("wrong password")
        return
    }

    res.status(200).json(user)
    return
  } catch (err) {
    console.log("err is",err)
    res.status(500).json(err)
    return
  }
});

module.exports = router;