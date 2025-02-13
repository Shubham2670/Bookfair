import axios from "axios";
import { Books } from "../types";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", 
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 5000, 
  });
 
  export const Bookslisting = async (): Promise<Books[]> => {
    try {
      const response = await axiosInstance.get<Books[]>("/addbooks");
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };

  export const saveBook = async (book: Books, isEditing: boolean): Promise<void> => {
    try {
      const url = "http://localhost:3000/addbooks";
      const method = isEditing ? "PUT" : "POST";
  
      await axiosInstance({
        method,
        url,
        data: book,
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Book saved successfully!");
    } catch (error) {
      console.error("Error saving book:", error);
      throw error; 
    }
  };  

  export const deleteOrder = async (orderId: number | string): Promise<void> => {
    try {
      await axiosInstance.delete(`/orders/${orderId}`);
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error; // Forward error for handling
    }
  };  
  