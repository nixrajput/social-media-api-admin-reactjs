import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle, ...props }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      {...props}
    >
      <h2
        style={{
          color: colors.primary[100],
        }}
      >
        {title}
      </h2>

      {
        subtitle ?
          <p
            style={{
              color: colors.primary[300],
            }}
          >
            {subtitle}
          </p>
          :
          null
      }
    </Box>
  );
};

export default Header;
