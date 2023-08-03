import { Box, useTheme } from "@mui/material"
import FlexBetween from "components/FlexBetween";


const Message = () => {
    const {palette} = useTheme()
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium; 

    return <FlexBetween sx={{
        // Add styles for the rounded box
        backgroundColor: '#881C1C',
        color: 'white',
        borderRadius: "2rem",
        padding: "1rem 2rem",
        marginBottom: "1rem",
        display: "inline-block", // Make the box width dependent on the content
        wordWrap: "break-word", // Allow words to wrap within the box
        maxWidth: "80%", // Set a maximum width for the box to prevent it from getting too wide
      }}>
        {/* Display the message */}
        dddddd
      </FlexBetween>
}


export default Message;