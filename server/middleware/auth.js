import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) { //toke will start with "Bearer ", this will be set on the frontend
            token = token.slice(7, token.length).trimLeft();    //this will remove the "Bearer " from the token : The slice(7, token.length) function call slices the token starting from index 7 until the end, effectively removing the first 7 characters. The trimLeft() function removes any leading whitespace characters that might be present after the slice operation.
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET); //this will verify the token using the secret key
        req.user = verified; //this will set the user to the verified token
        next(); //  this will move on to the next middleware (next step of the function)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}