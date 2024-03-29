import { Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { tokens } from "../../theme";

const VerificationRequestItem = ({ request, index, totalLength }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();

    return (
        <Box
            key={`user-${request._id}`}
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
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >

                <h5
                    style={{
                        color: colors.primary[100],
                    }}
                >
                    {request.user?.uname}
                </h5>

                <span
                    style={{
                        marginTop: '0.25rem',
                        color: colors.primary[100],
                        backgroundColor: request.status === 'rejected' ?
                            colors.error :
                            request.status === 'pending' ?
                                colors.warning :
                                colors.success,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '2rem',
                    }}
                >
                    {request.status}
                </span>

            </Box>

            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
                onClick={() => navigate(`/verification-requests/${request._id}`)}
            >
                <VisibilityIcon sx={{ color: colors.accent[800] }}
                />
            </Box>
        </Box>
    )
}

export default VerificationRequestItem;