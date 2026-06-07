import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router';
import { Routes, Route } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, push as firebasePush, onValue } from 'firebase/database'

import FeedbackPage from "./FeedbackPage";
import NavBar from "./NavBar";
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import Staff from './Staff';
import Login from './Login';
import firebase from 'firebase/compat/app';

export default function App(props) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unRegisteredFunction = onAuthStateChanged(auth, (FirebaseUser) => {
      setCurrentUser(FirebaseUser);
    });

    return function cleanup() {
      unRegisteredFunction();
    };
  }, []);


  return (
    <>
      <NavBar 
        currentUser={currentUser}
        />
      <Header />
      <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/menu" element={<MenuPage />} />
      <Route path="/menu/:menuId" element={<MenuPage />} />

      <Route path="/feedback" element={<FeedbackPage />} />

      <Route path="/staff" element={<Staff />} />
      <Route path="/staff/:menuId" element={<Staff />} />

      <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}