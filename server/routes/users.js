import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";


const router = express.Router();  // this will allow us to create routes

// instead of app.use we will do router

//CRUD

/* READ */
router.get('/:id', verifyToken, getUser); // this will be user/:id
router.get('/:id/friends', verifyToken, getUserFriends); // this will be user/:id

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend); // this will be user/:id/:friendId

export default router; //this will allow us to use the router in other files