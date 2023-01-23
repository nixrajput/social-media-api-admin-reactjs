import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const ListTile = ({ title, value, ...props }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            position="relative"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            {...props}
        >
            <p
                style={{
                    color: colors.primary[300],
                }}
            >
                {title}
            </p>

            <h5
                style={{
                    color: colors.primary[100],
                    textOverflow: 'ellipsis',
                }}
            >
                {value}
            </h5>
        </Box>
    )
}

export default ListTile;