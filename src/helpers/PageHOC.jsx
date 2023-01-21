import Topbar from "../components/Topbar";
import { Box } from "@mui/material";
import ResponsivePage from "../components/ResponsivePage";

const PageHOC = (WrappedComponent) => {
    const App = (props) => {
        return (
            <Box width="100%">
                <Topbar />
                <ResponsivePage
                    Component={WrappedComponent}
                    {...props}
                />
            </Box>
        );
    };

    return App;
};

export default PageHOC;