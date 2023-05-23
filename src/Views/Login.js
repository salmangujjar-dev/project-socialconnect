import { useState, useRef, useEffect } from "react";
import {
  Alert,
  Button,
  Stack,
  FormControl,
  TextField,
  Container,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();
  // const [values, setValues] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  // };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    localStorage.getItem("current-login") && navigate("/");
  });

  const handleSubmit = (e) => {
    setShowError(false);
    e.preventDefault();
    if (!localStorage.getItem("users")) {
      setShowError(true);
      return;
    }
    const userExists = JSON.parse(localStorage.getItem("users")).find(
      (user) =>
        user.email === email.current.value &&
        user.password === password.current.value
    );
    if (userExists) {
      setShowSuccess(true);
      localStorage.setItem("current-login", userExists.id);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setShowError(true);
    }
  };

  return (
    <Container
      style={{
        height: "98vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {showError && <Alert severity="error">Invalid Email or Password</Alert>}
      {showSuccess && (
        <Alert severity="success">
          Login Successful!
          <br />
          Redirecting to HomePage in 3 seconds.
        </Alert>
      )}

      <h1>Login Page</h1>
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
              required
              error={showError}
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
                    {showPassword ? <Visibility /> : <VisibilityOffIcon />}
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="outlined" color="success">
              Login
            </Button>
          </Stack>
        </FormControl>
      </form>
    </Container>
  );
};

export default Login;
