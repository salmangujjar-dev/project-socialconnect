import { Container } from "@mui/material";
import Loader from "./Components/Loader";
import { useEffect, useState } from "react";
import Home from "./Views/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLogin(localStorage.getItem("current-login") !== null);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isLogin ? (
        <Home />
      ) : (
        <Container>
          {showLogin ? (
            <Login setShowLogin={setShowLogin} setIsLogin={setIsLogin} />
          ) : (
            <Signup setShowLogin={setShowLogin} />
          )}
        </Container>

        // <div
        //   style={{
        //     height: "98vh",
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     flexDirection: "column",
        //   }}
        // >
        //   <h1>Welcome!!</h1>
        //   <Stack spacing={2} direction="column">
        //     <Link to="/login">
        //       <Button
        //         variant="contained"
        //         color="success"
        //         size="large"
        //         fullWidth
        //       >
        //         Login
        //       </Button>
        //     </Link>
        //     <Link to="/signup">
        //       <Button variant="contained" color="error" size="large" fullWidth>
        //         Signup
        //       </Button>
        //     </Link>
        //   </Stack>
        // </div>
      )}
    </>
  );
};

export default App;
