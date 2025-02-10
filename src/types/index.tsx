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