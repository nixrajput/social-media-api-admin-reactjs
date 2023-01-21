import { Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import VerifiedIcon from '@mui/icons-material/Verified';
import { tokens } from "../../theme";
import CircleAvatar from "../../components/CircleAvatar";

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
                <CircleAvatar
                    avatar={user.avatar}
                    size="48px"
                />

                <Box>
                    <h5
                        style={{
                            color: colors.primary[100],
                            marginLeft: '1rem',
                        }}
                    >
                        {user.uname}
                    </h5>

                    <p
                        style={{
                            color: colors.primary[300],
                            marginLeft: '1rem',
                        }}
                    >
                        {user._id}
                    </p>

                    <Box
                        ml="1rem"
                    >
                        <VerifiedUserIcon
                            sx={{
                                color: user.isValid ?
                                    colors.success
                                    :
                                    colors.error,
                                fontSize: '1rem',
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
                </Box>
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