import React from 'react';
import { BrowserRouter } from 'react-router';
import { Routes, Route } from "react-router";
import FeedbackPage from "./FeedbackPage";
import NavBar from "./NavBar";
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import Staff from './Staff';
import Login from './Login';
import Signup from './Signup';

export default function App(props) {
  return (
    <>
      <NavBar />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} /> 
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/staff" element ={<Staff />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}