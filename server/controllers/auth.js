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

        const salt = await bcrypt.genSalt(10); //this will generate a salt for us to hash the password    bcrypt.gensalt and hash returns a promise in new update
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

/*LOGGING IN USER */
export const login = async (req, res) => {
    try {
        const {email, password} = req.body; //we will grab the email and password when the user is trying to log in
        const user = await User.findOne ({email: email}); //using mongoose to find the user based on the email
        if (!user) return res.status(400).json({msg: "User does not exist"}); //if the user does not exist, we will send this message back to the frontend

        const isMatch = await bcrypt.compare(password, user.password); //it will use the same salt and this will compare the password that the user entered with the password in the database
        if (!isMatch) return res.status(400).json({msg: "Invalid Credentials"}); //if the password is incorrect, we will send this message back to the frontend
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET); //this will create a token for us to use for authentication :  token is created using the user's id as the payload and a secret key (process.env.JWT_SECRET) for signing the token.
        delete user.password; //this will delete the password from the user object
        res.json({token, user}); //this will send the token and user back to the frontend
    }
    catch (err) {
        res.status(500).json({error: err.message}); //this will send the error back to the frontend  500: internal server error
    }
}