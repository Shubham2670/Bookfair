// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // For navigation between pages

// const SellerModule: React.FC = () => {
//   const [books, setBooks] = useState<any[]>([
//     { id: 1, name: 'Book 1', stockCount: 10 },
//     { id: 2, name: 'Book 2', stockCount: 5 },
//   ]);
//   const [newBook, setNewBook] = useState({ name: '', stockCount: 1 });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewBook((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddBook = (e: React.FormEvent) => {
//     e.preventDefault();
//     setBooks([...books, { ...newBook, id: books.length + 1 }]);
//     setNewBook({ name: '', stockCount: 1 }); // Reset form
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <header className="text-center mb-8">
//         <h1 className="text-4xl font-semibold text-blue-600">Seller Dashboard</h1>
//         <p className="mt-4 text-lg text-gray-700">Manage your books and view orders</p>
//       </header>

//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold text-gray-700">Your Books</h2>
//         <ul className="mt-4">
//           {books.length > 0 ? (
//             books.map((book) => (
//               <li key={book.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
//                 <p className="text-xl font-medium text-gray-800">{book.name}</p>
//                 <p className="text-sm text-gray-500">Stock: {book.stockCount}</p>
//               </li>
//             ))
//           ) : (
//             <p>No books available. Add a new book below.</p>
//           )}
//         </ul>
//       </div>

//       <div className="bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-gray-700">Add a New Book</h2>

//         <form onSubmit={handleAddBook} className="mt-4">
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Book Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               value={newBook.name}
//               onChange={handleInputChange}
//               className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="stockCount" className="block text-sm font-medium text-gray-700">
//               Stock Count
//             </label>
//             <input
//               id="stockCount"
//               name="stockCount"
//               type="number"
//               value={newBook.stockCount}
//               onChange={handleInputChange}
//               className="mt-2 p-2 w-full border border-gray-300 rounded-md"
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
//           >
//             Add Book
//           </button>
//         </form>
//       </div>

//       <Link to="/" className="mt-8 inline-block text-blue-600">
//         Back to Home
//       </Link>
//     </div>
//   );
// };

// export default SellerModule;
