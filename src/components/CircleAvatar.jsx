import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";


const CircleAvatar = ({ avatar, size = '40px', fit = 'cover' }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const style = {
        position: "relative",
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: colors.primary[600],
    }

    if (avatar && avatar.url) {
        return (
            <Box
                sx={style}>
                <img
                    src={avatar.url}
                    style={{
                        position: "relative",
                        width: size,
                        height: size,
                        objectFit: fit,
                        aspectRatio: '1/1',
                    }}
                    alt="avatar"
                    width={size}
                    height={size}
                />
            </Box>
        )
    }

    return (
        <Box
            sx={style}>
            <img
                src='../../male_avatar.svg'
                style={{
                    position: "relative",
                    width: size,
                    height: size,
                    objectFit: fit,
                    aspectRatio: '1/1',
                }}
                alt="avatar"
                width={size}
                height={size}
            />
        </Box>
    )
}

export default CircleAvatar;