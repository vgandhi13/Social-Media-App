import bcrypt from 'bcrypt';    //this will allow us to hash the password/ decrypt the password
import jwt from 'jsonwebtoken'; //this will allow us to create a token
import User from '../models/User.js'; //this will allow us to use the user model


/* REGISTER USER */
export const register = async (req, res) => {  //because we are call mongodb database, this has to be async: req is what we get from frontend, res is what we send back to frontend, express provides this for us
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body; //we are getting all the data from the frontend and storing it in these variables
        
        //remember: since this is an async function, when we use await here, it will wait for the code to finish executing before moving on to the next line

        const salt = await bcrypt.genSalt(10); //this will generate a salt for us to hash the password
        const passwordHash = await bcrypt.hash(password, salt); //this will hash the password for us

        const newUser = new User({  //this will create a new user based on the User model
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),       //randomize the viewedProfile and impressions for now
            impressions: Math.floor(Math.random() * 10000),
        });

        const savedUser = await newUser.save(); //this will save the user to the database 
        res.status(201).json(savedUser); //this will send the saved user back to the frontend   201: something was created
    } 
    catch (err) {
        res.status(500).json({error: err.message}); //this will send the error back to the frontend  500: internal server error
    }
}