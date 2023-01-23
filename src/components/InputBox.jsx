import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const InputBox = ({ children, ...props }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            position="relative"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            width="100%"
            maxWidth={{
                xs: "100%",
                sm: "600px",
                md: "600px",
                lg: "600px",
                xl: "600px",
            }}
            height={{
                xs: '3.5rem',
                sm: '3.5rem',
                md: '3.5rem',
                lg: '3.75rem',
                xl: '3.75rem'
            }}
            m="1.5rem 0"
            transition="all 0.3s ease"
            sx={{
                "& input,select,textarea": {
                    backgroundColor: "transparent",
                    width: "100%",
                    height: "100%",
                    maxHeight: "4rem",
                    border: `1px solid ${colors.grey[500]}`,
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    fontFamily: "var(--primaryFontFace)",
                    fontWeight: "600",

                    padding: "0.5rem",
                    color: colors.primary[100],
                    outline: "none",
                },
                "& input::placeholder": {
                    color: colors.grey[500],
                    fontWeight: "500",
                },
                "& input:focus": {
                    border: `1px solid ${colors.primary[100]}`,
                },
                '& .password_toggle_btn': {
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: colors.grey[500],
                    cursor: 'pointer',
                    '&:hover': {
                        color: colors.primary[100]
                    }
                },
            }}
            {...props}
        >
            {children}
        </Box>
    )
}

export default InputBox;