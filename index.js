const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");//upload images to server
const cors = require("cors");//enables cors
const path = require("path");

//routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const categoryRouter = require("./routes/category");

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());//used to send json in response
app.use("/images", express.static(path.join(__dirname, "images")));
//express.static is used to serve static files to clients
//path.join() joins the two paths into 1 path
//__dirname is current directory
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/post", postRouter);

const storage = multer.diskStorage({//define storage
    destination: (req, file, callback) => {//destination folder
        callback(null, "images")
    },
    filename: (req, file, callback) => {//save as filename specified here
        callback(null, req.body.name)
    }
});
const upload = multer({ storage: storage });//create instance for upload
app.post("/api/upload",
    upload.single("file"),//middleware which uploads to server- takes "key" of file as argument
    (req, res) => {
        res.status(200).json("File has been uploaded");
    });

mongoose.connect(process.env.MONGO_URL).
    then(console.log("Connected to MongoDB")).
    catch(error => console.log(error));

const port = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
// }

app.listen(port, () => {
    console.log("Server is running on port " + port);
})