import WidgetWrapper from "components/WidgetWrapper"
import FlexBetween from "components/FlexBetween"
import { Navigate } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Box, Typography,Divider, useTheme, InputBase } from "@mui/material";
import { ManageAccountsOutlined, BorderColor, Send } from "@mui/icons-material"
import UserImage from "components/UserImage";
import Inbox from "./Inbox";
import Chatbox from "./Chatbox";


const MessageWidget = ({UserId, picturePath}) => {
    const [user, setUser] = useState();
    const [messagePerson, setMessagePerson] = useState(""); // person selected to send a message
    
    const token = useSelector((state) => state.token)
    const {palette} = useTheme()
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;    

    const getUser = async () => {
        const response = await fetch (`http://localhost:3001/users/${UserId}`,
            {method: 'GET',
            headers: {Authorization: `Bearer ${token}`}}
        )
        const data = await response.json()
        setUser(data)
    }

    
    useEffect(() => {
        getUser();
        //this function will be called when you render this component the first time
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if(!user) {     // helps to prevent these errors by stopping the component from rendering any JSX until the getUser function has completed and the user state has been updated with the fetched data.
        return null;
    }
    // Re-render: When the user state is updated with the fetched data, React will trigger a re-render of the MessageWidget component automatically. The re-render is due to the state update and not because of the useEffect hook itself.
    // useEffect hook is triggered only once during the initial render, and it will not be triggered again by the state update within it. The re-render after the state update occurs automatically because React detects the change in state and re-renders the component accordingly.
    // If user had been a regular variable instead of a state variable, the code would not have worked as intended, and the component would not have re-rendered after the data was fetched.
    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;

    const handleListItemClick = (text) => {
        setMessagePerson(text)
    }

    return <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
          >
            <FlexBetween gap="1rem">
              <UserImage image={picturePath} />
              <Box>
                <Typography
                  variant="h4"
                  color={dark}
                  fontWeight="700"
                  fontSize="1.75rem"
                  pr="3rem"
                >
                  Messaging
                </Typography>
                
              </Box>
              <BorderColor sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }} />
            </FlexBetween>
          </FlexBetween>

          <Divider />
          {messagePerson === "" ? (<Inbox handleListItemClick={handleListItemClick} /> ) : <Chatbox messagePerson={messagePerson} setMessagePerson = {setMessagePerson} /> }
    </WidgetWrapper>
}

export default MessageWidget