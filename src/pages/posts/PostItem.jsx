import { Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { tokens } from "../../theme";

const PostItem = ({ post, index, totalLength }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();

    return (
        <Box
            key={`post-${post._id}`}
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
                        marginLeft: '1rem',
                    }}
                >
                    {post._id}
                </h5>

                <p
                    style={{
                        color: colors.primary[300],
                        marginLeft: '1rem',
                        textTransform: 'capitalize'
                    }}
                >
                    {post.postType}
                </p>

                <p
                    style={{
                        color: colors.primary[300],
                        marginLeft: '1rem',
                    }}
                >
                    {post.owner.uname}
                </p>
            </Box>

            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
                onClick={() => navigate(`/posts/${post._id}`)}
            >
                <VisibilityIcon sx={{ color: colors.accent[800] }}
                />
            </Box>
        </Box>
    )
}

export default PostItem;