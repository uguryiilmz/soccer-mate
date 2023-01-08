const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const notificationsRoute=require("./routes/notifications");
const teamsRoute=require("./routes/teams")
const router = express.Router();
const cors = require('cors')
const path = require("path");

dotenv.config();

mongoose.set('useFindAndModify', false);


mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if(err) console.log("cant connect",err)
    else{
        console.log("Connected to MongoDB");
    }
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors())

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../client/public/uploads");
//   },
//   filename: (req, file, cb) => {
//     console.log("req body",req.body.name)
//     cb(null, String(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//     console.log("imageq",req.body, req.file)
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/notification",notificationsRoute);
app.use("/api/teams",teamsRoute);

app.disable('etag');

app.listen(8800, () => {
  console.log("Backend server is running!");
});