import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  AlertTitle,
  CircularProgress,
} from "@mui/material";
// import lginimage from "../assets/images/4957136.jpg";
// import loginbg from "../assets/images/4957136.jpg"
import lginimage from "../../assets/images/4957136.jpg"
import loginbg from '../../assets/images/login bg.jpg'
const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await login(values.email);
        setSnackbarMessage("Login successful! Redirecting...");
        setSnackbarSeverity("success");
      } catch (error) {
        setSnackbarMessage("Login failed. Please try again.");
        setSnackbarSeverity("error");
      } finally {
        setLoading(false);
        setOpenSnackbar(true);
      }
    },
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 p-4"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <div className="relative w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row overflow-hidden">
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${lginimage})` }}
        ></div>

        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Login to Your Account
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <TextField
              label="Email Address"
              variant="outlined"
              type="email"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              className="bg-white rounded-lg"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </form>

         
          <p className="text-center text-gray-600 mt-4">
            Become a Buyer?
            <span
              onClick={() => navigate("/register-buyer")}
              className="text-blue-600 cursor-pointer hover:underline ml-1"
            >
              Create Your Account
            </span>
          </p>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarSeverity === "success" ? (
            <AlertTitle>Success</AlertTitle>
          ) : (
            <AlertTitle>Error</AlertTitle>
          )}
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;
