import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Skills", path: "/skills" },
    { name: "Resume", path: "/resume" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">My Portfolio</div>

        {/* Hamburger icon for mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Menu items */}
        <ul className={`md:flex md:items-center md:space-x-6 absolute md:static bg-white w-full md:w-auto left-0 px-6 md:px-0 transition-all duration-300 ease-in ${
          isOpen ? "top-[70px] opacity-100" : "top-[-400px] md:opacity-100 opacity-0"
        }`}>
          {navItems.map((item, index) => (
            <li key={index} className="py-2 md:py-0 border-b md:border-none">
              <Link
                to={item.path}
                className="block text-gray-700 hover:text-blue-500 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
