import { useMemo } from "react";
import { Container, Typography } from "@mui/material";
import Styles from "../Styles/Styles";
import Navbar from "../Components/Navbar";

const Home = () => {
  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem("users")).find(
      (user) => user.id == localStorage.getItem("current-login")
    );
  }, []);

  return (
    <Container sx={Styles.screenCenter}>
      <Navbar />
      <Typography variant="h3" component="div" align="center">
        {user.name}, Welcome to the Homepage
      </Typography>
    </Container>
  );
};

export default Home;
