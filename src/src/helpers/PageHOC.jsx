import Topbar from "../components/global/Topbar";
import Sidebar from "../components/global/Sidebar";
import { Box } from "@mui/material";

const PageHOC = (WrappedComponent) => {
    return (props) => {
        return (
            <>
                <Topbar />
                <Box
                    display="flex"
                    flexDirection="row"
                    width="100%"
                    minWidth="100%"
                    mt={{ xs: "80px", sm: "80px", md: "80px", lg: "80px" }}
                >
                    <Sidebar />
                    <WrappedComponent {...props} />
                </Box>
            </>
        );
    };
};

export default PageHOC;