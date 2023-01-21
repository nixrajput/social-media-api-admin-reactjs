import { useProSidebar } from "react-pro-sidebar";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

const ResponsivePage = ({ Component, ...props }) => {

    const { collapsed } = useProSidebar();

    return (
        <Box
            width="100%"
            maxWidth="1024px"
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            overflow="hidden"
            m="0 auto"
            p="0"
            pb="2rem"
            mt="6rem"
        >
            <Sidebar />

            <Box
                width={{
                    xs: collapsed ? "calc(100% - 80px)" : "calc(100% - 240px)",
                    sm: collapsed ? "calc(100% - 80px)" : "calc(100% - 240px)",
                    md: collapsed ? "calc(100% - 80px)" : "calc(100% - 240px)",
                    lg: collapsed ? "calc(100% - 80px)" : "calc(100% - 240px)",
                    xl: collapsed ? "calc(100% - 80px)" : "calc(100% - 240px)",
                }}
                p={{
                    xs: "0 1rem",
                    sm: "0 1rem",
                    md: "0 1rem",
                    lg: "0 1rem",
                    xl: "0 1rem",
                }}
                sx={{
                    transition: "all 0.3s ease-in-out",
                }}
            >
                <Component {...props} />
            </Box>
        </Box>
    );
}

export default ResponsivePage;