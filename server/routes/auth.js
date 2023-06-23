import express from "express";
import {login} from "../controllers/auth.js";


const router = express.Router();  // this will allow us to create routes

// instead of app.use we will do router.post
router.post("/login", login); // this will be auth/login

export default router; //this will allow us to use the router in other files