import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";  //due to jsconfig.json, we can use absolute path , we dont have to use relative path "./"
import LoginPage from "scenes/loginPage";
import profilePage from "scenes/profilePage";


function App() {
  //setting up routes
  return (
    // :userId is a param we can set, if we got profile/1, then userId = 1 and we hit the route ProfilePage
    <div className="app">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<profilePage />} />  
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
