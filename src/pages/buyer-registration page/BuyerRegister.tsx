import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
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
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
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
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative flex flex-col md:flex-row items-center">
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
          <h2 className="text-3xl font-bold text-center text-blue-600">
            Register as a Buyer
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-6 w-full grid grid-cols-1 gap-4"
          >
            <input
              type="text"
              name="name"
              className={`w-full px-4 py-2 border rounded-md ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
            <input
              type="email"
              name="email"
              className={`w-full px-4 py-2 border rounded-md ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-24 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
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
