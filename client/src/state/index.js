import {createSlice} from "@reduxjs/toolkit";

const initialState = { 
    //this essentially will be the state stored in our global state, this data will be accessible throughout the application and we can grab it anywhere we want
    mode: "light", //this will represent light mode or dark mode globally
    user: null, //this will represent the user information we will store
    token: null, //this will represent all the auth information we will store,
    posts: [], //this will represent all the posts we will store
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {     //reducers are functions that will modify and update the global state as we need
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {  //action is the payload we pass in, or the arguments for the function
            state.user = action.payload.user; //in our payload we are sending the user parameter from the function
            state.token = action.payload.token; //in our payload we are sending the token parameter from the function
        },
        setLogout: (state) => {     //when user logsout, we want to clear the user and token
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {    
            if (state.user) {
                state.user.friends = action.payload.friends;
            }
            else {
                console.error("User friends not existent :< User is not logged in");
            }
        },
        setPosts: (state, action) => {      //this will set the posts in our global state
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPost = state.posts.map((post) => {
                if (post._id === action.payload.post_id) {
                    return action.payload.post;
                }
                return post;
            }
            );
            state.posts = updatedPost;
        }
    }
 });

 export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;  //part of redux toolkit, we can export the actions we want to use
 export default authSlice.reducer;