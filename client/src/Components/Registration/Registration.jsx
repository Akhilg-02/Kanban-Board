import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrationSchema } from "../Validation";
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
import "./Registration.css"

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

  const handleLoginPage = () =>{
    navigate("/login")
  }

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
     <Typography variant="h5" component="h1" className="registration-title">
          Create Account
        </Typography>

      {errors.general && (
          <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: "center" }}>
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
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </Box>

      <Typography variant="body2" className="registration-link">
          Already have an account?{" "}
          <Link onClick={handleLoginPage} underline="hover" sx={{ color: "#FFCE56", fontWeight: 500, cursor: "pointer" }}>
            Login
          </Link>
        </Typography>
    </Paper>
  </Container>
  );
};

export default Registration;

