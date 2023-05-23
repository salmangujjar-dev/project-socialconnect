import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  InputAdornment,
  Button,
  Container,
  Stack,
  FormControl,
  TextField,
} from "@mui/material";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  // const [values, setValues] = useState({
  //   name: "",
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

  const navigateUser = (arg) => {
    navigate(arg);
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    setUserExists(false);
    e.preventDefault();

    const existingUser = users.find(
      (user) => user.email === email.current.value
    );
    if (existingUser) {
      setUserExists(true);
      return;
    }

    const newUser = {
      id: users.length ? users[users.length - 1] + 1 : 0,
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    setSignupSuccess(true);
    setTimeout(() => {
      navigateUser("/login");
    }, 3000);
  };

  useEffect(() => {
    localStorage.getItem("current-login") && navigate("/");
    localStorage.getItem("users") &&
      setUsers(JSON.parse(localStorage.getItem("users")));
  }, []);

  const handleReset = (e) => {
    name = "";
    email = "";
    password = "";
  };

  return (
    <>
      <ArrowBackIcon
        color="error"
        fontSize="large"
        sx={{ cursor: "pointer" }}
        onClick={() => navigateUser(-1)}
      />
      <Container
        style={{
          height: "98vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {userExists && <Alert severity="error">User Already Exists!</Alert>}
        {signupSuccess && (
          <Alert severity="success">
            User Created Successfully!
            <br />
            Redirecting to login page in 3 seconds.
          </Alert>
        )}

        <h1>Sign Up Page</h1>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <FormControl>
            <Stack spacing={2} direction="column">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                type="text"
                inputRef={name}
                required
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                inputRef={email}
                required
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                name="password"
                type={showPassword ? "text" : "password"}
                inputRef={password}
                required
                inputProps={{
                  minLength: 8,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={togglePassword}
                      sx={{ cursor: "pointer" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOffIcon />}
                    </InputAdornment>
                  ),
                }}
              />
              <Stack justifyContent={"center"} direction={"row"} spacing={3}>
                <Button type="submit" variant="outlined" color="success">
                  Sign up
                </Button>
                <Button type="reset" variant="outlined" color="error">
                  Reset
                </Button>
              </Stack>
            </Stack>
          </FormControl>
        </form>
      </Container>
    </>
  );
};

export default Signup;
