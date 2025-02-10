import image1 from "../../assets/images/The-God-of-Small-Things-by-Arundhati-Roy.webp";
import image2 from "../../assets/images/The-Blue-Umbrella-by-Ruskin-Bond.webp";
import image3 from "../../assets/images/81fJiVNmx6L._SL1500_-687x1024.webp";
import image4 from "../../assets/images/4img.webp";
import image5 from "../../assets/images/5 img.webp";
import image6 from "../../assets/images/6img.jpg";
import image7 from "../../assets/images/7 img.jpg";
import image8 from "../../assets/images/8img.jpg";
import image9 from "../../assets/images/9image.jpg"


export const books: Book[] = [

    {
        id: 1, title: "The Blue Umbrella", author: "Ruskin Bond", price: 150, image: `${image2}`,
        mrp: 200,
        discount: 20
    },
    {
        id: 2, title: "Interpreter Of Maladies", author: "Jhumpa Lahiri", price: 200, image: `${image3}`,
        mrp: 300,
        discount: 25
    },
    {
        id: 3, title: "A Suitable Boy", author: "Author 2", price: 300, image: `${image4}`,
        mrp: 400,
        discount: 25
    },
    {
        id: 4, title: "Sale Man Rushide", author: "Author 1", price: 400, image: `${image5}`,
        mrp: 400,
        discount: 0
    },
    {
        id: 5, title: "Harry Potter and The Philosopher's Stone", author: "Author 2", price: 150, image: `${image6}`,
        mrp: 600,
        discount: 75
    },
    {
        id: 6, title: "Hawking", author: "Author 1", price: 200, image: `${image7}`,
        mrp: 500,
        discount: 65
    },
    {
        id: 7, title: "Black Holes", author: "Author 2", price: 15, image: `${image8}`,
        mrp: 500,
        discount: 90
    },
    {
        id: 8, title: "Letting Go", author: "Author 1", price: 10, image: `${image9}`,
        mrp: 400,
        discount: 95
    },
    {
        id: 9, title: "Hawking", author: "Author 2", price: 15, image: `${image8}`,
        mrp: 300,
        discount: 90
    },
    {
        id: 10, title: "The Art Of Letting Go", author: "Author 1", price: 10, image: `${image9}`,
        mrp: 100,
        discount: 95
    },
    {
        id: 11, title: "Interpreter Of Maladies", author: "Jhumpa Lahiri", price: 10, image: `${image3}`,
        mrp: 200,
        discount: 95
    },
    {
        id: 9, title: "Stephen Hawking", author: "Author 2", price: 15, image: `${image8}`,
        mrp: 300,
        discount: 95
    },
  ];

  export type Book = {
    id: number;
    title: string;
    author: string;
    price: number;
    mrp: number;
    discount: number;
    image: string;
  };