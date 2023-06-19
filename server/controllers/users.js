import User from "../models/User";

/* READ */
export const getUser = async (req, res) => { 
    try {
        const {id} = req.params; //we will grab the id from the params    suppose : req.params = {id: 123}, then id = 123, a new local variable id is created
        const user = await User.findById(id);
        res.status(200).json(user); 
        }
    catch (err) {
        res.status(404).json({message: err.message})
    }
};


export const getUserFriends = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(//multiple promises at the same time to database
        user.friends.map((friendId) => User.findById(friendId))
    ) 
    
    const formattedFriends = friends.map(({_id, firstName, lastName, occupation, location, picturePath}) => {
        return {_id, firstName, lastName, occupation, location, picturePath};
    }
    );
};