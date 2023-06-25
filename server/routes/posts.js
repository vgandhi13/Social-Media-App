import {express} from 'express';
import { getFeedPosts, getUserPosts, likePosts} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();  // this will allow us to create routes

// instead of app.use we will do router

/* READ */
router.get("/", verifyToken, getFeedPosts); // this will be posts/ // this will grab the user feed when we are on the home page // for now it will grab all the posts in the database and display them // we will change this in production level where we can have a machine learning algorithm
router.get("/:userId/posts", verifyToken, getUserPosts); // this will be posts/:userId/posts")  // will grab the posts of a=only a particular user, for eg: when you click on someone's profile on ig

/* UPDATE */
router.patch("/:id/like", verifyToken, likePosts); // this will be posts/:id/likePost // this will allow us to like a post and unlike it