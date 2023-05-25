import { useState, useRef } from "react";
import {
  Button,
  Stack,
  FormControl,
  TextField,
  Container,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Styles from "../Styles/Styles";
import LockIcon from "@mui/icons-material/Lock";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setShowLogin, setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    setShowError(false);
    e.preventDefault();
    if (!localStorage.getItem("users")) {
      toast.error("Error Occurred. See Logs!");
      console.log("Cannot Fetch Users Data.");
      setShowError(true);
      return;
    }
    const userExists = JSON.parse(localStorage.getItem("users")).find(
      (user) =>
        user.email === email.current.value &&
        user.password === password.current.value
    );
    if (userExists) {
      toast.success("Login Successful!\nRedirecting to Home in 2 seconds.");
      localStorage.setItem("current-login", userExists.id);
      setTimeout(() => {
        setIsLogin(true);
      }, 2000);
    } else {
      toast.error("Invalid Email or Password");
      setShowError(true);
    }
  };

  return (
    <>
      <Container style={Styles.screenCenter}>
        <ToastContainer
          position="top-center"
          theme="dark"
          hideProgressBar
          autoClose={3000}
        />
        <LockIcon fontSize="large" sx={Styles.color.primary} />
        <h1 style={Styles.color.primary}>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Stack spacing={2} direction="column">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                inputRef={email}
                error={showError}
                required
                autoFocus
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                name="password"
                type={showPassword ? "text" : "password"}
                inputRef={password}
                required
                error={showError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={togglePassword}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? (
                        <Visibility sx={Styles.color.primary} />
                      ) : (
                        <VisibilityOffIcon sx={Styles.color.primary} />
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <Button type="submit" variant="contained">
                Login
              </Button>
            </Stack>
          </FormControl>
        </form>
        <Typography variant="body1" marginTop={3}>
          Don't have an account?{" "}
          <Typography
            component="span"
            variant="body1"
            color="primary"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setShowLogin(false)}
          >
            Sign up
          </Typography>
        </Typography>
      </Container>
    </>
  );
};

export default Login;
