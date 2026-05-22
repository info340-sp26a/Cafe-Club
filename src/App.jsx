import React from 'react';
import { Routes, Route } from 'react-router';
import FeedbackPage from "./components/FeedbackPage";
import NavBar from "./components/NavBar";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/homePage';

export default function App(props) {
  return (
    <>
      <NavBar />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
      <Footer />
    </>
  );
}