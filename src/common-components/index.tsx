import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box component="footer" className="bg-gray-900 text-white py-4 text-center mt-auto ">
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} BookFair App. All rights reserved.
      </Typography>
    </Box>
  );
};

import { TextField } from "@mui/material";
import { useField } from "formik";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  fullWidth?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type = "text", fullWidth = true, className }) => {
  const [field, meta] = useField(name); 

  return (
    <TextField
      {...field} 
      label={label}
      variant="outlined"
      type={type}
      fullWidth={fullWidth}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      className={`bg-white rounded-lg ${className}`} 
    />
  );
};

export default InputField;
