import React, { useState, useEffect, useContext } from 'react';
import {
  MdNotifications,
  MdNotificationsNone,
  MdNotificationsActive,
} from 'react-icons/md';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userAction';


export default function NavBar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = () => {
      dispatch(logout()); // Call the logout action
      toast.success(' Logout Successfully!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      navigate('/login'); // Redirect to login page
    };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? isDarkMode
            ? 'bg-light text-dark shadow-md'
            : 'bg-light text-dark shadow-md'
          : isDarkMode
          ? 'bg-transparent text-white'
          : 'bg-light text-dark'
      }`}
    >
      <div className="navbar mx-auto max-w-7xl font-medium text-3xl">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 w-52 rounded-box ${
                isDarkMode
                  ? 'bg-gray-800 text-white'
                  : 'bg-base-100 text-gray-800'
              } p-2 shadow`}
            >
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/cases">Get Verified Cases</Link>
              </li>
              <li>
                <Link to="/schools">Partner Schools</Link>
              </li>
              <li className="underline">
                <Link to="/student/id">Switch to Student</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            Parho Pakistan
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/cases">Get Verified Cases</Link>
            </li>
            <li>
              <Link to="/schools">Partner Schools</Link>
            </li>
            <li className="underline ml-5">
              <Link to="/student/id">Switch to Student</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          <div className="hover:cursor-pointer">
            {isAuthenticated ? <MdNotifications /> : ''}
          </div>
          <div
            onClick={toggleTheme}
            className="cursor-pointer text-xl flex items-center justify-center"
          >
            {isDarkMode ? (
              <FaSun className="text-yellow-500" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </div>
          <div className="-mt-4">
            {isAuthenticated ? (
              <Link
                onClick={handleLogout}
                className="bg-[#3431BB] text-white hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => toast('Welcome to the Login page!')}
                className="bg-[#3431BB] text-white hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
