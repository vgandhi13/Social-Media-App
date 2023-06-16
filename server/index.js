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

/* CONFIGURATIONS for packages and middleware */
const __filename = fileURLToPath(import.meta.url);          //because we used type modules we can do this
const __dirname = path.dirname(__filename);
dotenv.config(); // so that we can use dotenv files
const app = express(); // initialize express
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