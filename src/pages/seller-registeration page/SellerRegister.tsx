import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Snackbar, Alert, AlertTitle } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import registerImage from "../../assets/images/seller register234.avif";
import serllerbg from "../../assets/images/seller bg image.jpg";

const SellerRegister: React.FC = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      shopName: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Seller name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      shopName: Yup.string().required("Shop name is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        const existingUser = response.data.find(
          (user: { email: string }) => user.email === values.email
        );
        if (existingUser) {
          setSnackbarMessage("Email already registered! Please log in.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        } else {
          const newSeller = { ...values, role: "seller" };
          await axios.post("http://localhost:3000/users", newSeller);
          setSnackbarMessage("Seller account created successfully!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          setTimeout(() => navigate("/seller-Dashboard"), 2000);
        }
      } catch (error) {
        setSnackbarMessage("Error while registering. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    },
  });
  const handleSnackbarClose = () => setOpenSnackbar(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-6"
      style={{ backgroundImage: `url(${serllerbg})` }}
    >
      <div className="bg-white rounded-lg shadow-lg flex w-full max-w-4xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={registerImage}
            alt="Register"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
            Seller Registration
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Seller Name"
              variant="outlined"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              label="Shop Name"
              variant="outlined"
              {...formik.getFieldProps("shopName")}
              error={formik.touched.shopName && Boolean(formik.errors.shopName)}
              helperText={formik.touched.shopName && formik.errors.shopName}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full mt-4 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Register Seller
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-600">
              Already have an account? Login here
            </Link>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          <AlertTitle>
            {snackbarSeverity === "success" ? "Success" : "Error"}
          </AlertTitle>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SellerRegister;
