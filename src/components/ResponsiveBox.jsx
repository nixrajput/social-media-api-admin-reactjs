import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ResponsiveBox = ({ children, ...props }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            position="relative"
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            width="100%"
            maxWidth="1024px"
            bgcolor={colors.background}
            p="0"
            m="0 auto"
            overflow="hidden"
            mt="6rem"
            {...props}
        >
            {children}
        </Box>
    )
}

export default ResponsiveBox;