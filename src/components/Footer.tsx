import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Bookfair. All rights reserved.</p>
        <div className="mt-2">
          <a href="/about" className="hover:text-gray-400">About Us</a> | 
          <a href="/contact" className="hover:text-gray-400"> Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
