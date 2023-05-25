import { yellow } from "@mui/material/colors";

const Styles = {
  screenCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  color: {
    primary: {
      color: yellow[700],
    },
  },
  postsStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowX: "hidden",
    overflowY: "scroll",
    maxHeight: "80vh",
  },
  commentStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowX: "hidden",
    overflowY: "scroll",
    maxHeight: "80vh",
  },
};

export default Styles;
