import { FormikProps } from "formik";
import { ReactNode } from "react";

export enum Roles {
    BUYER = "buyer",
    SELLER = "seller",
    ADMIN = "admin",
  }
export  interface OrderItem {
    id: string | number;
    title: string | number;
    author: string | number;
    price: number;
    mrp: number;
    discount: number;
    image: string;
    quantity: number;
  }
  
export  interface Order {
    id: string | number;
    items: OrderItem[];
    date: string;
  }
  

export  interface OrdersListProps {
    orders: Order[];
    onDelete: (orderId: string | number) => void;
  }  

export  interface Book {
    quantity: ReactNode;
    id: number;
    title: string;
    author: string;
    price: number;
    mrp: number;
    discount: number;
    image: string;
  }  

 export interface Books {
    id: number;
    title: string;
    author: string;
    image: string;
    price: number;
    mrp: number;
    discount: number;
    quantity: number;
  }
  
  
export interface BookFormValues {
  title: string;
  author: string;
  price: number;
  mrp: number;
  quantity: number;
  discount: number;
  image?: string;
}

export interface AddBookProps {
  handleClose: () => void;
  formik: FormikProps<BookFormValues>;
  open: boolean;
  isEditing: boolean;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}