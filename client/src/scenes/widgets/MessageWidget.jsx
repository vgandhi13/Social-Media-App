import WidgetWrapper from "components/WidgetWrapper"
import FlexBetween from "components/FlexBetween"
import { Navigate } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Box, Typography,Divider, useTheme, InputBase } from "@mui/material";
import { ManageAccountsOutlined, BorderColor, Send } from "@mui/icons-material"
import UserImage from "components/UserImage";
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';

const MessageWidget = ({UserId, picturePath}) => {
    const [user, setUser] = useState();
    const [messagePerson, setMessagePerson] = useState(""); // person selected to send a message
    const [message, setMessage] = useState(""); // message sent to the person
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
          {messagePerson === "" ? (<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }} alignItems="flex-start" onClick={() => handleListItemClick('Brunch this weekend?')}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List> ) : <Box sx={{
        width: '25rem', // Set the width to 200 pixels
        height: '25rem', // Set the height to 100 pixels
        backgroundColor: {dark},
        padding: '20px',
        borderRadius: '5px',
        display: 'flex', // Set the container to have flex display
        flexDirection: 'column', // Align children vertically
        justifyContent: 'flex-end', // Align children at the bottom of the container
      }}>
        <FlexBetween>
            <InputBase
                    placeholder="Type a message..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    sx= {
                        {
                            width: "100%",
                            backgroundColor: palette.neutral.light,
                            borderRadius: "2rem",
                            padding: "1rem 2rem",
                            marginRight: "1rem"
                        }
                    }
                >

                </InputBase>
                <Send sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }} />
        </FlexBetween>
      </Box> }
    </WidgetWrapper>
}

export default MessageWidget