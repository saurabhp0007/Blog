import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Logo, LogoutBtn, Footer } from './components';
import { logo } from './assets';
import { FaHome, FaList, FaPlus, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const navItems = [
    {
      icon: <FaHome className='text-2xl'/>,
      slug: "/",
      active: true,
      isVertical: true,
    },
    {
      icon: <FaList className='text-2xl'/>,
      slug: "/all-posts",
      active: authStatus,
      isVertical: true,
    },
    {
      icon: <FaPlus className='text-2xl'/>,
      slug: "/add-post",
      active: authStatus,
      isVertical: true,
    },
    {
      icon: <FaSignInAlt className='text-black'/>,
      slug: "/login",
      active: !authStatus,
      isVertical: false,
      name: "Login",
    },
    {
      icon: <FaUserPlus />,
      slug: "/signup",
      active: !authStatus,
      isVertical: false,
      name: "Signup",
    },
  ];

  return !loading ? (
    <div className='min-h-screen flex flex-col'>
      <div className='mr-4 flex justify-between'>
        <Link to='/' className='p-2 pl-4'>
          <img src={logo} alt='logo' />
        </Link>
        {/* Right Section */}
        <ul className='flex items-start justify-start'>
          {authStatus && (
            <li className=''>
              <LogoutBtn />
            </li>
          )}
          <div className='ml-auto flex items-center'>
            {navItems
              .filter(item => !item.isVertical && item.active)
              .map(item => (
                <li key={item.slug} className='ml-4'>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-block px-4 py-2 duration-200 bg-gray-50 border border-gray-100 hover:bg-violet-600 hover:text-white rounded-full ${
                      item.slug === window.location.pathname ? 'bg-blue-500 text-white' : ''
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
          </div>
        </ul>
      </div>
      <header className='py-3'>
        <nav className='flex items-start'>
          {/* Left Section */}
          <div className='flex flex-col items-start justify-start'>
            <ul className='flex flex-col mr-2'>
              {navItems
                .filter(item => item.isVertical && item.active)
                .map(item => (
                  <li key={item.slug} className='text-start mt-3'>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`inline-block duration-200 px-2 py-2 mb-6 hover:bg-blue-100 rounded-full ${
                        item.slug === window.location.pathname ? 'bg-blue-500 text-white' : ''
                      }`}
                    >
                      {item.icon}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
          {/* Center Content */}
          <main className='flex-grow flex items-center justify-center'>
            <Outlet />
          </main>
        </nav>
      </header>
    </div>
  ) : null;
}

export default App;
