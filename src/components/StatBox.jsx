import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      m="0.5rem 2rem"
    >
      <h4
        style={{
          color: colors.primary[100],
          marginTop: "0.5rem",
        }}
      >
        {title}
      </h4>

      <p
        style={{
          color: colors.primary[400],
          marginTop: "0.5rem",
          textTransform: "capitalize",
        }}
      >
        {subtitle}
      </p>
    </Box >
  );
};

export default StatBox;
