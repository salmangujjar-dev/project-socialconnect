import { useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Styles from "../Styles/Styles";
import {
  InputAdornment,
  Button,
  Container,
  Stack,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ setShowLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      toast.error(`User ${email} already exists!`);
      return;
    }

    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 0,
      name: name,
      email: email,
      password: password,
    };
    console.log(users[users.length - 1] + 1);
    console.log(newUser);

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    toast.success(
      "User created successfully!\n Redirecting to Login in 3 seconds."
    );
    setTimeout(() => {
      setShowLogin(true);
    }, 3000);
  };

  useEffect(() => {
    localStorage.getItem("users") ?? setUsers([]);
    localStorage.getItem("users") &&
      setUsers(JSON.parse(localStorage.getItem("users")));
  }, []);

  const handleReset = (e) => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Container sx={Styles.screenCenter}>
        <ToastContainer
          position="top-center"
          theme="dark"
          hideProgressBar
          autoClose={3000}
        />
        <LockOpenIcon fontSize="large" sx={Styles.color.primary} />
        <h1 style={Styles.color.primary}>Sign Up Page</h1>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <FormControl>
            <Stack spacing={2} direction="column">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                      {showPassword ? (
                        <Visibility sx={Styles.color.primary} />
                      ) : (
                        <VisibilityOffIcon sx={Styles.color.primary} />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              <Stack justifyContent={"center"} direction={"row"} spacing={3}>
                <Button type="submit" variant="contained">
                  Sign up
                </Button>
                <Button type="reset" variant="contained" color="error">
                  Reset
                </Button>
              </Stack>
            </Stack>
          </FormControl>
        </form>
        <Typography variant="body1" marginTop={3}>
          Already have an account?{" "}
          <Typography
            component="span"
            variant="body1"
            color="primary"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setShowLogin(true)}
          >
            Login
          </Typography>
        </Typography>
      </Container>
    </>
  );
};

export default Signup;
