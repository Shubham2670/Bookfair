import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Snackbar, TextField } from "@mui/material";
import bgimage from "../../assets/images/register3456.jpg";
import bgimg from "../../assets/images/12345.avif";
import { axiosInstance } from "../../services/api-instance";

const RegisterBuyer: React.FC = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleSnackbarClose = () => setOpenSnackbar(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.get("http://localhost:3000/users");
        const existingUser = response.data.find(
          (user: { email: string }) => user.email === values.email
        );

        if (existingUser) {
          setSnackbarMessage("Email already registered! Please log in.");
          setSnackbarSeverity("error");
        } else {
          await axiosInstance.post("http://localhost:3000/users", {
            ...values,
            role: "buyer",
            isRegistered: true,
          });

          setSnackbarMessage("Buyer account created successfully!");
          setSnackbarSeverity("success");

          setTimeout(() => navigate("/login"), 2000);
        }
        setOpenSnackbar(true);
      } catch (error) {
        setSnackbarMessage(
          "There was an error while registering. Please try again."
        );
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    },
  });

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="bg-customWhite rounded-lg shadow-lg p-8 w-full max-w-2xl relative flex flex-col md:flex-row items-center">
        {/* Left Side Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={bgimg}
            alt="Register"
            className="w-56 h-96 object-cover rounded-md"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center text-customIndigo">
            Register as a Buyer
          </h2>

          <form
            onSubmit={formik.handleSubmit}
            className="mt-6 w-full grid grid-cols-1 gap-4"
          >
            <TextField
              label="Full name"
              variant="outlined"
              type="text"
              fullWidth
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              className="bg-customWhite rounded-lg"
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              className="bg-customWhite rounded-lg"
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.password)}
              helperText={formik.touched.email && formik.errors.password}
              className="bg-customWhite rounded-lg"
            />

            <TextField
              label="ConfirmPassword"
              variant="outlined"
              type="password"
              fullWidth
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.email && Boolean(formik.errors.confirmPassword)
              }
              helperText={formik.touched.email && formik.errors.confirmPassword}
              className="bg-customWhite rounded-lg"
            />

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-24 bg-customIndigo text-customWhite py-2 rounded-md hover:bg-customIndigo transition"
              >
                Register
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-customIndigo cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </p>
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

export default RegisterBuyer;
