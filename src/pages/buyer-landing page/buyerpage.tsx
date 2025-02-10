import { useEffect, useState } from "react";
import { useCart } from "../../contexts/Cart-Context";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Divider,
  Rating,
  CircularProgress,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../common-components";
import SearchIcon from "@mui/icons-material/Search";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { axiosInstance } from "../../services/api-instance";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  mrp: number;
  discount: number;
  image: string;
}

export const BuyerPage = () => {
  const { addToCart } = useCart();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]); // Default price range
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (book: Book) => {
    addToCart(book);
    setOpenSnackbar(true); 
  };

  // Snackbar ko close karne ka function
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  useEffect(() => {
    const fetchBooks = async () => {
        try {
          const response = await axiosInstance.get("/addbooks");
          setBooks(response.data);
        } catch (error) {
          console.error("Error fetching books:", error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchBooks();
  }, []);

  // Unique authors ka list banane ke liye
  const authors = Array.from(new Set(books.map((book) => book.author)));

  // Filtered books logic
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = selectedAuthor
      ? book.author === selectedAuthor
      : true;
    const matchesPrice =
      book.price >= priceRange[0] && book.price <= priceRange[1];

    return matchesSearch && matchesAuthor && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8 px-2 md:px-8 py-6  mt-[48px]">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} 
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Item added successfully!
        </Alert>
      </Snackbar>
      <div className="flex justify-end mb-1 mt-2">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          className="text-white border-white px-4 py-2 rounded-lg 
         hover:bg-indigo-800 active:bg-indigo-700
         transition-all duration-300"
        >
          Back to Homepage
        </Button>
      </div>
      <Box sx={{ textAlign: "center", position: "relative" }}>
        <Typography
          variant="h4"
          className="font-bold inline-block px-4 bg-slate-50 relative z-10"
        >
          📚 Welcome to Bookfair!
        </Typography>
        <Divider
          sx={{
            position: "absolute",
            width: "100%",
            top: "50%",
            left: 0,
            zIndex: 0,
          }}
        />
      </Box>
      {/* Search and Filter Options */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center my-6">
        <TextField
          label="Search books..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          label="Filter by Author"
          variant="outlined"
          size="small"
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          className="w-full sm:w-48"
        >
          <MenuItem value="">All Authors</MenuItem>
          {authors.map((author) => (
            <MenuItem key={author} value={author}>
              {author}
            </MenuItem>
          ))}
        </TextField>

        <div className="flex w-full sm:w-auto gap-4">
          <TextField
            label="Min Price"
            type="number"
            variant="outlined"
            size="small"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-full sm:w-32"
          />

          <TextField
            label="Max Price"
            type="number"
            variant="outlined"
            size="small"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full sm:w-32"
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress />
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <img
            src="https://via.placeholder.com/150?text=No+Books+Available"
            alt="No books available"
            className="w-40 h-40 mb-4"
          />
          <Typography variant="h6" color="textSecondary">
            No books available at the moment.
          </Typography>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card
              key={book.id}
              className="flex w-full h-72 max-w-lg p-4 shadow-md hover:shadow-lg transition h-56"
            >
              <div className="w-40 h-full flex items-center">
                <CardMedia
                  component="img"
                  image={book.image}
                  alt={book.title}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>

              <CardContent className="ml-4 flex flex-col justify-between h-full overflow-hidden">
                <div>
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-900 line-clamp-2"
                  >
                    {book.title}
                  </Typography>

                  <Typography variant="body2" color="primary">
                    by {book.author}
                  </Typography>

                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Rating value={4.5} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="textSecondary">
                      95
                    </Typography>
                  </Box>

                  <Chip
                    label="Limited time deal"
                    color="error"
                    size="small"
                    className="mt-2"
                  />

                  <Typography
                    variant="h6"
                    className="mt-2 font-bold text-gray-900"
                  >
                    ₹{book.price}{" "}
                    <span className="text-gray-500 text-sm line-through">
                      ₹{book.mrp}
                    </span>
                    <span className="text-green-600 text-sm">
                      ({book.discount}% off)
                    </span>
                  </Typography>
                </div>

                <Divider className="my-2" />

                <Button
                  onClick={() => handleAddToCart(book)}
                  variant="contained"
                  color="warning"
                  startIcon={<ShoppingCartIcon />}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md">
        <Footer />
      </div>
    </div>
  );
};
