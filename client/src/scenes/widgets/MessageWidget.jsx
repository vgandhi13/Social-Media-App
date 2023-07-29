import WidgetWrapper from "components/WidgetWrapper"
import FlexBetween from "components/FlexBetween"
import { Navigate } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Box, Typography,Divider, useTheme } from "@mui/material";
import { ManageAccountsOutlined } from "@mui/icons-material"
import UserImage from "components/UserImage";
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';

const MessageWidget = ({UserId, picturePath}) => {
    const [user, setUser] = useState();
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
                  
                >
                  Messaging
                </Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>

          <Divider />
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
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
    </List>
    </WidgetWrapper>
}

export default MessageWidget