import Post from "../models/Post.js";
import User from "../models/User.js";


/* CREATE */
export const createPost = async (req, res) => {
    try {
        const {userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {/*someId: true*/},
            comments: []
        });
        await newPost.save();

        const post = await Post.find();   // this will return all the posts with the updated so that we can give it to the frontend and they can display it in the feed
        res.status(201).json(post);  //201 means something was created
    } 
    catch (err) {
        res.status(409).json({message: err.message});   //409: conflict
    }
};


/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();   // this will return all the posts with the updated so that we can give it to the frontend and they can display it in the feed
        res.status(200).json(post); //200 means everything is ok, successful request
    } 
    catch (err) {
        res.status(404).json({message: err.message});   //404: not found
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const post = await Post.find({userId});  //this will return all the posts with the userId that we are looking for
        res.status(200).json(post); //200 means everything is ok, successful request
    }
    catch (err) {
        res.status(404).json({message: err.message});   //404: not found
    }
};

/* UPDATE */
export const likePosts = async (req, res) => {
    try {
        const { id } = req.params;      //the id comes from the query string
        const { userId } = req.body;
        const post = await Post.findById(id);   //this will return the post with the id that we are looking for
        const isLiked = post.likes.get(userId);    //this will return true if the user has already liked the post, false otherwise

        if (isLiked) {
            post.likes.delete(userId);  //if the user has already liked the post, then we will remove the like
        }
        else {
            post.likes.set(userId, true);   //if the user has not liked the post, then we will add the like
        }
        
        // It then uses Post.findByIdAndUpdate(id, {likes: post.likes}, {new: true}) to update the post in the database with the new likes value. The {new: true} option ensures that the updated post is returned as the result.
        const updatedPost = await Post.findByIdAndUpdate (
            id,
            {likes: post.likes},
            {new: true}
        ); //this will update the post with the new likes

        res.status(200).json(updatedPost); //200 means everything is ok, successful request
    }
    catch (err) {
        res.status(404).json({message: err.message});   //404: not found
    }
}
