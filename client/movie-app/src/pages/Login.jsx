import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Topbar from "../component/Topbar";
import { FadeLoader } from "react-spinners";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleLogin = () => {
    let temp = false;
    if (!email.trim()) {
      temp = true;
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
    if (!password.trim()) {
      temp = true;
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }

    if (temp) {
      console.log(emailError, passwordError, "form inside data");
      return;
    }

    setLoading(true);

    const userData = { email, password };
    axios
      .post("https://propftx-8u8u.onrender.com/login", userData)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("Token", response.data.Token);
        localStorage.setItem("username", response.data.userName);
        toast.success("Login successful");
        navigate("/movies");
      })
      .catch((error) => {
        console.error("Error logging in:", error.response);
        toast.error(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    localStorage.clear();
  });

  return (
    <>
      <Topbar pageTitle="Welcome to our Movie Hub" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <h1>Login</h1>
        <ToastContainer />
        {loading && (
          <FadeLoader
            color={"#36D7B7"}
            loading={loading}
            css={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "300px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            style={{ margin: "8px", width: "100%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            style={{ margin: "8px", width: "100%" }}
            value={password}
            error={passwordError}
            helperText={passwordError}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "8px", width: "100%" }}
            onClick={handleLogin}
            disabled={loading}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            color="primary"
            style={{ margin: "8px", alignSelf: "flex-start" }}
          >
            Register
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
