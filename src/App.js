import { Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Views/Home";
const App = () => {
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    localStorage.getItem("current-login") && setIsTokenValid(true);
  }, []);
  return (
    <>
      {isTokenValid ? (
        <Home />
      ) : (
        <div
          style={{
            height: "98vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>Welcome!!</h1>
          <Stack spacing={2} direction="column">
            <Link to="/login">
              <Button
                variant="contained"
                color="success"
                size="large"
                fullWidth
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="contained" color="error" size="large" fullWidth>
                Signup
              </Button>
            </Link>
          </Stack>
        </div>
      )}
    </>
  );
};

export default App;
