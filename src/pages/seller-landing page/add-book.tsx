import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { AddBookProps } from "../../types";

export const Addbook: React.FC<AddBookProps> = ({
  handleClose,
  formik,
  open,
  isEditing,
  handleImageUpload,
}) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {isEditing ? "Edit Book" : "Add New Book"}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            style={{ position: "absolute", right: 16, top: 16 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit} className="grid gap-4">
            <TextField
              label="Book Title"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps("title")}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              label="Author"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps("author")}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Price"
                type="number"
                fullWidth
                variant="outlined"
                {...formik.getFieldProps("price")}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
              <TextField
                label="MRP"
                type="number"
                fullWidth
                variant="outlined"
                {...formik.getFieldProps("mrp")}
                error={formik.touched.mrp && Boolean(formik.errors.mrp)}
                helperText={formik.touched.mrp && formik.errors.mrp}
              />
              <TextField
                label="Quantity"
                type="number"
                fullWidth
                variant="outlined"
                {...formik.getFieldProps("quantity")}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
              <TextField
                label="Discount (%)"
                type="number"
                fullWidth
                variant="outlined"
                {...formik.getFieldProps("discount")}
                error={
                  formik.touched.discount && Boolean(formik.errors.discount)
                }
                helperText={formik.touched.discount && formik.errors.discount}
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="cursor-pointer w-full flex items-center justify-center border-dashed border-2 border-customGray rounded-lg p-4 hover:border-blue-500 transition">
                <AddPhotoAlternate className="text-customGray mr-2" />
                <span className="text-customGray">Upload Book Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
              {formik.values.image && (
                <div className="mt-4 relative">
                  <IconButton
                    size="small"
                    className="absolute top-1 left-32 bg-customWhite shadow-md"
                    color="error"
                    onClick={() => formik.setFieldValue("image", "")}
                  >
                    <Close />
                  </IconButton>
                  <img
                    src={formik.values.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
              {formik.touched.image && formik.errors.image && (
                <p className="text-customRed">{formik.errors.image}</p>
              )}
            </div>
            <DialogActions>
              <Button variant="contained" onClick={handleClose} color="inherit">
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                className="bg-customIndigo"
              >
                {isEditing ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
