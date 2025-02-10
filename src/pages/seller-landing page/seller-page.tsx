import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import {
  LibraryBooks,
  AddPhotoAlternate,
  Close,
  Edit,
  Delete,
} from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import OrderPage from "./order-page";
import { validationSchema } from "./utils";
import { axiosInstance } from "../../services/api-instance";

const SellerDashboard = () => {
  const [books, setBooks] = useState<
    {
      title: string;
      author: string;
      price: number;
      mrp: number;
      discount: number;
      image: string;
    }[]
  >([]);
  const [orders, setOrders] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          formik.setFieldValue("image", event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleEdit = (index: number) => {
    const book = books[index];
    formik.setValues(book); // Formik state update
    setEditIndex(index); // Edit index store
    setIsEditing(true); // Editing mode set
    setOpen(true); // Dialog open
  };
  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditIndex(null);
    formik.resetForm();
  };

  const handleAddNewBook = () => {
    setIsEditing(false);
    setEditIndex(null);
    formik.resetForm({
      values: {
        title: "",
        author: "",
        price: 0,
        mrp: 0,
        discount: 0,
        image: "",
      },
    });
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      price: 0,
      mrp: 0,
      discount: 0,
      image: "",
    },

    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      let updatedBooks = [...books];

      if (isEditing && editIndex !== null) {
        updatedBooks[editIndex] = values;
      } else {
        updatedBooks.push(values); // 🟢 Add new book
      }

      setBooks(updatedBooks);
      localStorage.setItem("books", JSON.stringify(updatedBooks));

      try {
        const url = "http://localhost:3000/addbooks";
        const method = isEditing ? "put" : "post";

        await axiosInstance({
          method,
          url,
          data: values,
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Error saving book:", error);
      }
      handleClose();
      resetForm();
    },
  });

  const handleDelete = async (orderId: string | number) => {
    try {
      await axiosInstance.delete(`http://localhost:3000/orders/${orderId}`);
  
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
  
      // Update localStorage (if needed)
      const updatedOrders = JSON.stringify(
        JSON.parse(localStorage.getItem("orders") || "[]").filter(
          (order: { id: string | number }) => order.id !== orderId
        )
      );
  
      localStorage.setItem("orders", updatedOrders);
  
      console.log(`Order with ID ${orderId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  
  
  
  useEffect(() => {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);
  useEffect(() => {
    axiosInstance
      .get("/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8  mt-[48px]">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">
          📦 Seller Dashboard
        </h1>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          className="text-white border-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition-all"
        >
          Back to Homepage
        </Button>
      </div>

      {/* Books Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <LibraryBooks className="text-green-500" /> Manage Books
          </h2>
          <Button
            variant="contained"
            className="bg-indigo-800"
            onClick={handleAddNewBook}
          >
            Add Book
          </Button>
        </div>

        <div className="mt-4">
          {books.length === 0 ? (
            <p className="text-gray-500 text-sm md:text-base">
              No books added yet.
            </p>
          ) : (
            <div className="mt-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              <ul className="space-y-2">
                {books.map((book, index) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-100 rounded-md flex flex-wrap justify-between items-center gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-10 h-10 md:w-12 md:h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-sm md:text-base">
                          {book.title} - {book.author}
                        </p>
                        <p className="text-gray-600 text-xs md:text-sm">
                          Price: ₹{book.price} | MRP: ₹{book.mrp} | Discount:{" "}
                          {book.discount}%
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(index)}
                        size="small"
                        startIcon={<Edit />}
                        className="!bg-slate-500 !text-white !px-3 !py-2 !rounded-lg hover:!bg-teal-700 shadow-md transition-all"
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Delete />}
                        onClick={() => {
                          const updatedBooks = books.filter(
                            (_, i) => i !== index
                          );
                          setBooks(updatedBooks);
                          localStorage.setItem(
                            "books",
                            JSON.stringify(updatedBooks)
                          );
                        }}
                        className="!bg-red-600 !text-white !px-3 !py-2 !rounded-lg hover:!bg-red-700 shadow-md transition-all"
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <OrderPage orders={orders} onDelete={handleDelete} />
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
            </div>
            <TextField
              label="Discount (%)"
              type="number"
              fullWidth
              variant="outlined"
              {...formik.getFieldProps("discount")}
              error={formik.touched.discount && Boolean(formik.errors.discount)}
              helperText={formik.touched.discount && formik.errors.discount}
            />
            <div className="flex flex-col items-center">
              <label className="cursor-pointer w-full flex items-center justify-center border-dashed border-2 border-gray-300 rounded-lg p-4 hover:border-blue-500 transition">
                <AddPhotoAlternate className="text-gray-500 mr-2" />
                <span className="text-gray-500">Upload Book Image</span>
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
                    className="absolute top-1 left-32 bg-white shadow-md"
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
                <p className="text-red-500">{formik.errors.image}</p>
              )}
            </div>

            <DialogActions>
              <Button variant="contained" onClick={handleClose} color="inherit">
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                className="bg-indigo-800"
              >
                {isEditing ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerDashboard;
