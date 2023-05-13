import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Avatar from './components/CreateAvatar/CreateAvatar';
import Navbar2 from './components/Navbar2/Navbar2';
import Home from './components/Home/home';
import Home2 from './components/Home2/Home2';
import About from './components/About/about';
import Difference from './components/Difference/difference';
import Service from './components/Services/services';
import Contact from './components/Contact/contact';
import Login from './components/LogIn/Login';
import TTS from './components/TTS/TTS';
import Video from './components/Video/Video';
import WebGL from './components/Web GL/WebGL';
import Register from './components/Register/Register';
import Footer from './components/Footer/footer';
import { Route, Routes, useRoutes } from 'react-router-dom';

function App() {
  const auth= localStorage.getItem("user");
  const isAuthenticated = auth !== null;
  const routes = isAuthenticated? (useRoutes([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: '/home',
      element: (
        <>
          <Navbar />
          <Home2 />
        </>
      ),
    },
    {
      path: '/about',
      element: (
        <>
          <Navbar />
          <About />
        </>
      ),
    },
    {
      path: '/difference',
      element: (
        <>
          <Navbar />
          <Difference />
        </>
      ),
    },
    {
      path: '/avatar',
      element: (
        <>
          <Navbar />
          <Avatar />
        </>
      ),
    },
    {
      path: '/TTS',
      element: (
        <>
          <Navbar />
          <TTS />
        </>
      ),
    },
    {
      path: '/video',
      element: (
        <>
          <Navbar />
          <WebGL />
        </>
      ),
    },
    {
      path: '/service',
      element: (
        <>
          <Navbar />
          <Service />
        </>
      ),
    },
    {
      path: '/contact',
      element: (
        <>
          <Navbar />
          <Contact />
        </>
      ),
    },
    {
      path: '/login',
      element: (
        <>
          <Navbar />
          <Login />
        </>
      ),
    },
    {
      path: '/register',
      element: (
        <>
          <Navbar />
          <Register />
        </>
      ),
    },
  ])
):(
  useRoutes([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: '/home',
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: '/about',
      element: (
        <>
          <Navbar />
          <About />
        </>
      ),
    },
    {
      path: '/difference',
      element: (
        <>
          <Navbar />
          <Difference />
        </>
      ),
    },
    {
      path: '/avatar',
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: '/TTS',
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: '/video',

      element: (
        <>
          <Navbar />
          <Home />
        </>)
    },
    {
      path: '/service',
      element: (
        <>
          <Navbar />
          <Service />
        </>
      ),
    },
    {
      path: '/contact',
      element: (
        <>
          <Navbar />
          <Contact />
        </>
      ),
    },
    {
      path: '/login',
      element: (
        <>
          <Navbar />
          <Login />
        </>
      ),
    },
    {
      path: '/register',
      element: (
        <>
          <Navbar />
          <Register />
        </>
      ),
    },
  ])
)
  return (
    <>
      {routes}
      <Footer />
    </>
  );
}

export default App;
