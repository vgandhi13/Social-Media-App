import {Box, Typography, useTheme, useMediaQuery} from "@mui/material";
import Form from "./Form";

const loginPage = () => {
    const theme = useTheme(); // hook provided by material ui, allows us to access stuff from theme.js
    const isNonMobileScreens = useMediaQuery("(mid-width: 1000px)"); // hook is also provided by Material-UI and is used to perform responsive design by matching the current viewport size against a specified media query.
    // This means that isNonMobileScreens will be true if the screen width is greater than or equal to 1000 pixels, indicating a non-mobile screen size.

    return <Box>
                <Box width="100%" backgroundColor = {theme.palette.background.alt} p="1rem 6%" textAlign="center">
                    <Typography
                        fontWeight="bold"
                        fontSize="32px"
                        color="primary"
                        >
                        UMassConnect
                    </Typography>
                </Box>
                <Box width={isNonMobileScreens ? "50%":"93%"}
                    p="2rem"
                    m="2rem auto"
                    borderRadius="1.5rem"
                    backgroundColor= {theme.palette.background.alt}
                    >
                    <Typography fontWeight="500" variant="h5" sx={{mb:"1.5rem"}}>
                        Welcome to UMassConnect, connecting UMass folks with UMass folks!
                    </Typography>
                    <Form />
                </Box>
            </Box>;
};

export default loginPage;