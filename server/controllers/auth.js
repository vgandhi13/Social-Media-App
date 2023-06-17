import bcrypt from 'bcrypt';    //this will allow us to hash the password/ decrypt the password
import jwt from 'jsonwebtoken'; //this will allow us to create a token
import User from '../models/User.js'; //this will allow us to use the user model