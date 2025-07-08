import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Container,
  Card,
  Alert,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <Container maxWidth="sm" sx={{ mt: 9 }}>
      <Card elevation={4} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Welcome to Sign In Page
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size={"large"}
          onClick={async () => {
            try {
              const res = await axios.post(
                "http://localhost:8080/user/login",
                {
                  userName: username,
                  password: password,
                }
              );
              let data = res.data;
              localStorage.setItem("token", data.token);
              window.location = "/";
            } catch (err) {
              console.error("Signup failed:", err);
              alert("Signup failed. Please try again.");
            }
          }}
        >
          Sign IN
        </Button>
      </Card>
    </Container>
  );
};

export default Login;
