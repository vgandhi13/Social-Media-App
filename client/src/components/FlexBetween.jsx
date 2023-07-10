import {Box} from "@mui/material";
import {styled} from "@mui/system";

// this is essentially called styled component, and you can name it whatever you want as if it is another component and you can just pass in css properties in here
const FlexBetween = styled(Box) ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

//by doing this it allows us to reuse this set of css properties through different areas
//it is very useful to use as it helps us allign things in proper location

export default FlexBetween;