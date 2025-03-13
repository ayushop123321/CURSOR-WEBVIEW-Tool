import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
            <h1 className="text-xl font-bold">MCP Tool</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-200 transition duration-300">
              Home
            </Link>
            <Link href="/documentation" className="hover:text-blue-200 transition duration-300">
              Documentation
            </Link>
            <Link href="https://github.com/ayushop123321/CURSOR-WEBVIEW-Tool" 
                  className="hover:text-blue-200 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer">
              GitHub
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button className="p-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16m-7 6h7" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 