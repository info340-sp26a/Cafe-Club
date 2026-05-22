import React from 'react';
import { Routes, Route } from 'react-router';
import FeedbackPage from "./FeedbackPage";
import NavBar from "./NavBar";
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import MenuPage from './MenuPage';

export default function App(props) {
  return (
    <>
      <NavBar />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
      <Footer />
    </>
  );
}