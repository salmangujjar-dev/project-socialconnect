import { createTheme } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2d9cdb",
      dark: "#2e85d4",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          background: yellow[700],
          color: "#fff",
          fontWeight: "bold",
          "&:hover": {
            background: "#fff",
            color: yellow[700],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "black",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: yellow[700],
              borderSize: 2,
            },
            "&:hover fieldset": {
              borderColor: yellow[700],
            },
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        customRoot: {
          padding: "10px",
          backgroundColor: yellow[700],
          color: "#fff",
          fontWeight: "bold",
        },
      },
    },
  },
});
