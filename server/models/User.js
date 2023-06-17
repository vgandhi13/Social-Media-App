import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,    
        min: 2,
        max: 50,  // firstName is of type string is required, and has a min length of 2 and max length of 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,  // lastName is of type string is required, and has a min length of 2 and max length of 50
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,   // email is of type string is required, and has a max length of 50 and is unique - unique because you cannot have duplicate emails
    }, 
    password: {
        type: String,
        required: true,
        min: 5, // password is of type string is required, and has a min length of 5
    },
    picturePath: {
        type: String,
        default: "",    // picturePath is of type string and has a default value of ""
    }, 
    friends: {
        type: Array,
        default: [],    // friends is of type array and has a default value of []
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
    }, 
    {timestamps: true}   //timestamps will automatically create a createdAt and updatedAt field for us
); 

const User = mongoose.model("User", UserSchema); //this will create a model called User based on the UserSchema
export default User; //this will allow us to use the User model in other files