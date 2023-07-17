import {Box} from "@mui/material";
import {styled} from "@mui/system";

// creating a reusable style component
const WidgetWrapper = styled(Box)(({theme}) => ({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem", // top right bottom left
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem"
}));

export default WidgetWrapper;