import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import {register} from "./controllers/auth.js";
import { verify } from "crypto";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import {users, posts} from "./data/index.js";

/* CONFIGURATIONS for packages and middleware */
const __filename = fileURLToPath(import.meta.url);          //because we used type modules in package.json we can do this
const __dirname = path.dirname(__filename);
dotenv.config(); // so that we can use dotenv files
const app = express(); // initialize express
//everything passed in app.use are middlewares
app.use(express.json);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());    //invokes our cross origin resource sharing policy
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); //serves static files from the public folder -- detailed: serves the directory where we keep our assets like images. For now we are storing it locally, but to make it scalable in future we can store it in a cloud storage like AWS S3 or Azure Blob Storage

/*FILE STORAGE*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {       //anytime a user uploads a file to a website, we want to store it in the public/assets folder
       cb(null, "public/assets"); 
    },
    filename: (req, file, cb) => {
        cb(null, req.originalname);
    }
});
const upload = multer({storage}); //initialize multer with the storage configuration  --- detailed: anytime we want to upload a file, we will use this variable


/*Routes WITH FILES */
//upload.single("picture") - this will grab the picture property, if the image is located with "picture" in the http call, then this will grab it and upload it into the local
app.post("/auth/register", upload.single("picture"), register);  //the is not in the authRoutes because we need to use multer to upload the file, for other routes we can keep them separate
app.post("/posts", verifyToken, upload.single("picture"), createPost); //this will be posts/ (we are not using the prefix /posts because we are using it in the postRoutes, createPost is a controller we have set

/* Routes WITHOUT FILES */
app.use("/auth", authRoutes); //this will prefix all the routes in authRoutes with /auth
app.use("/users", userRoutes); //this will prefix all the routes in userRoutes with /user
app.use("/posts", postRoutes); //this will prefix all the routes in postRoutes with /posts


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001; //initialize port by default to 3001, but if not available then use the port 6001         mongoose.connect returns a promise
mongoose.connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error) => console.log(`${error} did not connect`));