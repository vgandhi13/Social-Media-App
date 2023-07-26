import {Box, useMediaQuery} from "@mui/material"
import { useEffect, useState } from "react";
import { UseSelector, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const profilePage = () => {
    const [user, setUser] = useState(null);
    const {userId} = useParams(); //grabs from url, we have set this through useNavigate
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: {Authorization:  `Bearer ${token}`}
        })
        const data = response.json();
        setUser(data);
    }

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    return <Box>
        <Navbar />
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex":"block"} //when we display for big screens we can have three widgets in a row whereas on smaller screens they will be on top of each other
            gap = "2rem"
            justifyContent="center"
        >
            <Box flexBasis={isNonMobileScreens ? "26%":undefined}>
                <UserWidget UserId={userId} picturePath={user.picturePath}/>
                <Box m="2rem 0" />
                <FriendListWidget userId={userId} />
            </Box>
            <Box 
                flexBasis={isNonMobileScreens ? "42%":undefined}
                mt={isNonMobileScreens? undefined: "2rem"}
            >
                <MyPostWidget picturePath = {user.picturePath} />
                <Box m="2rem 0" />
                <PostsWidget userId= {userId} isProfile />
            </Box>
        </Box>
    </Box>;
};

export default profilePage;