import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";

const Friend = ({friendId, name, subtitle, userPicturePath}) => {
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token)
    const friends = useSelector((state) => state.user.friends)

    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend) => friend._id === friendId);//check if friend id exists and if the id is equal to the friendid passed from the parent component
     // CHECK IF USER IS A FRIEND, if not a friend we want to give the option to select the friend, otherwise deselct the friend. depending if they are friend or not show a different icon

    //check if able to add friend or not
    //Purpose: PATCH is used to apply partial modifications to a resource on the server. It only updates the specified fields of a resource, leaving the rest unchanged.
     const patchFriend = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"  //  in a fetch() request, we need to send data in JSON format with the Content-Type header set to application/json to indicate that the request body is in JSON. The JSON.stringify() method is commonly used to achieve this
                }
            }
        )
        const data = await response.json();
        dispatch(setFriends({friends: data}));
     }

     //bug: when we go to user, and we go to certain user's profile page, and then we click another user's profile page, and try to go to that user, the url does update with react router, however the components do not re render.
     //workaround: i use navigate(0), we go to other user's page, and then refresh the page, so the components are re rendered. in production, fix this
     return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size = "55px" />
                <Box
                    onClick= {()=> {
                        navigate(`/profile/${friendId}`); 
                    }}
                >
                    <Typography
                        color = {main}
                        variant="h5"
                        fontWeight="500"
                        sx = {{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                    >
                       {name} 
                    </Typography>
                    <Typography color = {medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <IconButton
                onClick={() => patchFriend()}
                sx = {{backgroundColor: primaryLight, p: "0.6rem"}}
            >
            {isFriend ? (
                <PersonRemoveOutlined sx={{color: primaryDark}} />
            ): (<PersonAddOutlined sx={{color: primaryDark}} />)}
            </IconButton>
        </FlexBetween>
     )
}

export default Friend;