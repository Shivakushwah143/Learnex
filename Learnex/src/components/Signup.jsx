
import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
} from "@mui/material";

const Signup = () => {
  const [user, setUserName] = useState("");
  const [pass, setPassword] = useState("");

  return (
    <Container maxWidth="sm" sx={{ mt: 9 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography color="green" variant="h5" align="center" gutterBottom>
            Welcome to Sign Up Page
          </Typography>
          <div className="mt-3 p-3 gap-2">
            <TextField
              label="Username"
              name="userName"
              fullWidth
              value={user}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={pass}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="p-2 mt-4">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size={"large"}
              onClick={async () => {
                try {
                  const res = await axios.post(
                    "http://localhost:8080/user/signup",
                    {
                      userName:user,
                      password:pass,
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
              Sign up
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
