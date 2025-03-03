import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../Validation";
import { useApi } from "../../Context/ApiContext";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Link,
} from "@mui/material";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { user, loginUser } = useApi();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { error } = loginSchema.validate(formData, { abortEarly: false });
    if (!error) return true;

    setError(error.details[0].message);
    return false;
  };

  useEffect(() => {
    if (user) {
      // navigate(`/board/${user.userId}`);
      navigate(`/dashboard`);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;
    setLoading(true);

    try {
      await loginUser(formData);
    } catch {
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: 400,
          height: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 3,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h5" component="h1" className="login-title">
          Welcome Back
        </Typography>

        {error && (
          <Typography
            color="error"
            variant="body2"
            sx={{ mb: 2, textAlign: "center" }}
          >
            {error}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, width: "100%" }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(error)}
            helperText={error}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(error)}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-button"
            disabled={loading}
            sx={{
              mt: 2,
              borderRadius: 2,
              fontWeight: "bold",
              padding: "10px 0",
              backgroundColor: "#FFCE56",
              color: "#333",
              "&:hover": {
                backgroundColor: "#FFB74D",
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>

        <Typography variant="body2" className="login-link">
          Don't have an account?{" "}
          <Link
            href="/"
            underline="hover"
            sx={{ color: "#FFCE56", fontWeight: 500 }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;


