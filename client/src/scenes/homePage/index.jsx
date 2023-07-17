import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath} = useSelector((state) => state.user)
    return <Box>

        <Navbar/>
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex":"block"} //when we display for big screens we can have three widgets in a row whereas on smaller screens they will be on top of each other
            gap = "0.5rem"
            justifyContent="space-between"
        >
            <Box flexBasis={isNonMobileScreens ? "26%":undefined}>
                <UserWidget UserId={_id} picturePath={picturePath}/>
            </Box>
            <Box 
                flexBasis={isNonMobileScreens ? "42%":undefined}
                mt={isNonMobileScreens? undefined: "2rem"}
            >
               {isNonMobileScreens && (
                <Box flexBasis="26%">
                    
                </Box>
               )} 
            </Box>
        </Box>
    </Box>
};

export default HomePage;