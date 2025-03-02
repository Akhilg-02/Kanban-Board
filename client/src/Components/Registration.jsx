import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrationSchema } from "./Validation";
import { useApi } from "../Context/ApiContext";
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

const Registration = () => {
  const navigate = useNavigate();
  const { registerUser } = useApi();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { error } = registrationSchema.validate(formData, { abortEarly: false });
    if (!error) return true;

    const newErrors = {};
    error.details.forEach((err) => {
      newErrors[err.path[0]] = err.message;
    });

    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);
    try {
      await registerUser(formData);
      alert("🎉 Registration successful! Redirecting to login...");
      navigate("/login");
    } catch {
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete = Object.values(formData).every((value) => value.trim() !== "");

  return (
    <Container component="main" maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper 
        elevation={6} 
        sx={{ 
          padding: 4, 
          width: 400, 
          height: 350, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center", 
          borderRadius: 3, 
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" color="primary">
          Register
        </Typography>

        {errors.general && (
          <Typography color="error" variant="body2">
            {errors.general}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: "100%" }}>
          {["name", "email", "password"].map((field) => (
            <TextField
              key={field}
              fullWidth
              margin="normal"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              type={field === "password" ? "password" : "text"}
              value={formData[field]}
              onChange={handleChange}
              error={Boolean(errors[field])}
              helperText={errors[field]}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
          ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!isFormComplete || loading}
            sx={{ mt: 2, borderRadius: 2, fontWeight: "bold", padding: "10px 0" }}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link href="/login" underline="hover">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Registration;
