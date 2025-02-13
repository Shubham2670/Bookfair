import { useEffect, useState } from "react";
import {
  Button,

  Snackbar,
  Alert,
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
import { useFormik } from "formik";
import OrderPage from "./order-page";
import { validationSchema } from "./utils";
import {
  axiosInstance,
  deleteOrder,
  saveBook,
} from "../../services/api-instance";
import { Addbook } from "./add-book";

const SellerDashboard = () => {
  const [books, setBooks] = useState<
    {
      title: string;
      author: string;
      price: number;
      mrp: number;
      discount: number;
      image: string;
      quantity: number;
    }[]
  >([]);
  const [orders, setOrders] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
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
    formik.setValues(book); 
    setEditIndex(index);
    setIsEditing(true); 
    setOpen(true); 
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
        quantity: 0,
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
      quantity: 0,
    },

    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Submitting values:", values);
      let updatedBooks = [...books];

      if (isEditing && editIndex !== null) {
        updatedBooks[editIndex] = values;
      } else {
        updatedBooks = [values, ...books];
      }

      setBooks(updatedBooks);
      localStorage.setItem("books", JSON.stringify(updatedBooks));

      try {
        await saveBook(book, isEditing);
      } catch (error) {
        console.error("Error saving book:", error);
      }
      handleClose();
      resetForm();
    },
  });

  const handleDelete = async (orderId: string | number) => {
    try {
      await deleteOrder(orderId);

      setOrders((prevOrders) =>
        prevOrders.filter((order: any) => order.id !== orderId)
      );

      const updatedOrders = JSON.stringify(
        JSON.parse(localStorage.getItem("orders") || "[]").filter(
          (order: { id: string | number }) => order.id !== orderId
        )
      );

      localStorage.setItem("orders", updatedOrders);

      console.log(`Order with ID ${orderId} deleted successfully`);
      setOpenSnackbar(true);
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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 mt-[48px]">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
        >
          Order deleted successfully!
        </Alert>
      </Snackbar>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-lg md:text-2xl font-bold text-gray-800">
          📦 Seller Dashboard
        </h1>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          className="text-white border-white px-3 md:px-4 py-1 md:py-2 rounded-lg hover:bg-indigo-800 transition-all"
        >
          Back to Homepage
        </Button>
      </div>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <LibraryBooks className="text-green-500" /> Manage Books
          </h2>
          <Button
            variant="contained"
            className="bg-indigo-800 text-sm md:text-base px-3 py-2"
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
                    <div className="flex flex-wrap gap-2">
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
                          setOpenSnackbar(true);
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
      <Addbook
        handleClose={handleClose}
        formik={formik}
        open={open}
        isEditing={isEditing}
        handleImageUpload={handleImageUpload}
       
      />
    </div>
  );
};

export default SellerDashboard;
