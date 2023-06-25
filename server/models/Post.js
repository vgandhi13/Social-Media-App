import mongoose from "mongoose";

const postSchema = new mongoose.Schema (
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,   //represents profile image of the user who posted
        likes: {
            type: Map,  // we will have array of objects but this is how mongodb saves it
            of: Boolean,
        },       // we check if the user id exists in this map, and it returns true always if it exists, so if you like it, then you add to this map, if not you will remove from the map
                // we use a map because it is more efficient than array, Map is a data structure that stores key value pairs, and it is more efficient than array, O(1) vs O(n)
        comments: {
            type: Array,
            default: [],
        }
    },
    {timestamps: true}
);

const Post = mongoose.model("Post", postSchema);
export default Post;