import * as Yup from "yup";
export const validationSchema = Yup.object({
    title: Yup.string().required("Book title is required"),
    author: Yup.string().required("Author name is required"),
    price: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    mrp: Yup.number()
      .positive("MRP must be a positive number")
      .required("MRP is required"),
    discount: Yup.number()
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot be more than 100%"),
    image: Yup.string().required("Book image is required"),
    quantity: Yup.number()
    .min(1, "Quantity must be at least 1") 
    .required("Quantity is required"),
  });

  
