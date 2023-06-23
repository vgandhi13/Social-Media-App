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

// this function utilizes Promise.all() to concurrently retrieve information about the user's friends from the database. It maps over the user.friends array, which presumably contains the IDs of the user's friends, and for each friend ID, it uses User.findById(friendId) to retrieve the corresponding friend document. The Promise.all() ensures that all these asynchronous operations are resolved and waits for them to complete, returning an array of friend documents. */
export const getUserFriends = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(//multiple promises at the same time to database    // Promise.all() takes an array of promises and returns a new promise that is fulfilled when all the promises in the array are fulfilled or rejected if any of the promises are rejected. It waits for all the asynchronous operations to complete.
            user.friends.map((friendId) => User.findById(friendId))         //map each user with the particularfriendId to a user   // This creates an array of promises, where each promise represents an asynchronous operation to retrieve a friend's information from the database
        ) // Promise.all() ensures that all these asynchronous operations are resolved and waits for them to complete, returning an array of friend documents.
        // documents are resolved promises

        // const formattedFriends = friends.map(...) maps over the friends array to transform each friend document into a new formatted object. The destructuring assignment is used to extract specific properties (_id, firstName, lastName, occupation, location, picturePath) from each friend document, and a new object with these properties is returned for each friend.
        const formattedFriends = friends.map(({_id, firstName, lastName, occupation, location, picturePath}) => {   // array of objects
            return {_id, firstName, lastName, occupation, location, picturePath};
        }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};


/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        // if the user.friends array contains the friendId, then remove the friendId from the user.friends array and remove the userId from the friend.friends array. Otherwise, push the friendId to the user.friends array and push the userId to the friend.friends array.
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);    //filter out the friendId from the user.friends array
            friend.friends = friend.friends.filter((id) => id !== id);      //filter out the userId from the friend.friends array
        }
        else {
            user.friends.push(friendId);    //push the friendId to the user.friends array
            friend.friends.push(id);        //push the userId to the friend.friends array
        }
        await user.save();
        await friend.save();        //updates the database

        const friends = await Promise.all(//multiple promises at the same time to database    // Promise.all() takes an array of promises and returns a new promise that is fulfilled when all the promises in the array are fulfilled or rejected if any of the promises are rejected. It waits for all the asynchronous operations to complete.
            user.friends.map((friendId) => User.findById(friendId))         //map each user with the particularfriendId to a user   // This creates an array of promises, where each promise represents an asynchronous operation to retrieve a friend's information from the database
        ) // Promise.all() ensures that all these asynchronous operations are resolved and waits for them to complete, returning an array of friend documents.
        // documents are resolved promises

        // const formattedFriends = friends.map(...) maps over the friends array to transform each friend document into a new formatted object. The destructuring assignment is used to extract specific properties (_id, firstName, lastName, occupation, location, picturePath) from each friend document, and a new object with these properties is returned for each friend.
        const formattedFriends = friends.map(({_id, firstName, lastName, occupation, location, picturePath}) => {   // array of objects
            return {_id, firstName, lastName, occupation, location, picturePath};
        }
        );

        res.status(200).json(formattedFriends);
    }
    catch (err) {
        res.status(404).json({message: err.message});
    }
}