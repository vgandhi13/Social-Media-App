import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state';
import {configureStore} from "@reduxjs/toolkit";    //used to configure the redux store
import {Provider} from "react-redux";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'; // redux persist is so that we can store our global state in local storage, so that when we refresh the page, we dont lose our state. Anytime the user closes the tab or closes the browser, the user information will still be there. The only way they can get rid of it is if they clear the cacher or clear the local storage

const persistConfig = {key: "root", storage, version: 1}; //this is the configuration for redux persist, we are setting the key to root, the storage to local storage, and the version to 1
const persistedReducer = persistReducer(persistConfig, authReducer); //this is the reducer we are going to use, we are going to use the authReducer we created in client\src\state\index.js  This creates a new reducer that wraps authReducer and adds persistence functionality to it.
const store = configureStore({ //this is the store we are going to use, we are going to use the store we created in client\src\state\index.js
  reducer: persistedReducer,  //  includes the wrapped reducer with persistence functionality.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware ({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], //these are the actions we want to ignore
    },
  })
});

// <Provider> is provided by 'react-redux' and wraps the entire component tree. It makes the Redux store available to all components in the application.
// <PersistGate> ensures that the application waits for the persisted state to be retrieved from storage before rendering the child components. The loading prop is set to null (no loading component is displayed), and the persistor prop is set to persistStore(store) to persist and rehydrate the store.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>   
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


