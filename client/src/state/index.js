import {createSlice} from "@reduxjs/toolkit";

// In Redux Toolkit, a "slice" refers to a section of the Redux store that manages a 
// specific part of the application state.

/* example to understabd 
const counterSlice = createSlice({
  name: 'counter', // Name of the slice
  initialState: 0, // Initial state for the slice
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;

In the example above, the createSlice function creates a slice named "counter". It specifies an
 initial state of 0 and defines two reducers: increment and decrement

 The createSlice function automatically generates action creators and action types based on the provided reducers. For example, the increment reducer generates an 
 action creator called increment() and an action
  type of 'counter/increment'. These can be used to dispatch actions to update the state.



The actions property of the counterSlice object contains the generated action creators. 
The reducer property contains the reducer function that handles the actions and updates the 
state accordingly.

  */

const initialState = { 
    //this essentially will be the state stored in our global state, this data will be accessible throughout the application and we can grab it anywhere we want
    mode: "light", //this will represent light mode or dark mode globally
    user: null, //this will represent the user information we will store
    token: null, //this will represent all the auth information we will store,
    posts: [], //this will represent all the posts we will store
};

// By organizing the state and related logic into slices, Redux promotes a modular and scalable approach to managing application state.
// Each slice can handle a specific domain or feature, making it easier to reason about and maintain the state management codebase. 
// Slices can be combined together to create the overall application state using Redux's combineReducers function.
export const authSlice = createSlice({
    name: "auth",
    initialState, //over here this is an object, but this could be anything
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