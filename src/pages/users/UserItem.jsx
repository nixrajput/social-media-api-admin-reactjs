import { Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import VerifiedIcon from '@mui/icons-material/Verified';
import { tokens } from "../../theme";
import CircleAvatar from "../../components/global/CircleAvatar";

const UserItem = ({ user, index, totalLength }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();

    return (
        <Box
            key={`user-${user._id}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor={colors.dialog}
            boxShadow={colors.defaultShadow}
            p="1rem"
            mb="0.75rem"
            sx={{
                ':last-child': {
                    marginBottom: '0'
                }
            }}
        >
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <CircleAvatar avatar={user.avatar} />

                <p
                    style={{
                        color: colors.grey[100],
                        marginLeft: '1rem',
                    }}
                >
                    {user.uname}
                </p>

                <VerifiedUserIcon
                    sx={{
                        color: user.isValid ?
                            colors.success
                            :
                            colors.error,
                        fontSize: '1rem',
                        marginLeft: '0.5rem',
                    }}
                />

                <VerifiedIcon
                    sx={{
                        color: user.isVerified ?
                            colors.accent[600]
                            :
                            colors.primary[500],
                        fontSize: '1rem',
                        marginLeft: '0.25rem',
                    }}
                />
            </Box>

            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
                onClick={() => navigate(`/users/${user._id}`)}
            >
                <VisibilityIcon sx={{ color: colors.accent[800] }}
                />
            </Box>
        </Box>
    )
}

export default UserItem;