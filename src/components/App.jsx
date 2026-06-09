import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import firebase from 'firebase/compat/app';

import FeedbackPage from "./FeedbackPage";
import NavBar from "./NavBar";
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import Staff from './Staff';
import Login from './Login';


export default function App(props) {
  const [currentUser, setCurrentUser] = useState(null);

  const navigateTo = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unRegisteredFunction = onAuthStateChanged(auth, (FirebaseUser) => {
      if(FirebaseUser){
        setCurrentUser(FirebaseUser);
        navigateTo('/');
      } else {
        setCurrentUser(null);
      }
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
         <Route path="/login" element={<Login currentUser={currentUser} />} />

      

      <Route element={<ProtectedPage currentUser={currentUser} />} >
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage currentUser={currentUser} />} />
        <Route path="/menu/:menuId" element={<MenuPage currentUser={currentUser} />} />

        <Route path="/feedback" element={<FeedbackPage />} />

        <Route path="/staff" element={<Staff />} />
        <Route path="/staff/:menuId" element={<Staff />} />
      </Route>
      
      </Routes>
      <Footer />
    </>
  );
}

function ProtectedPage(props) {
  //...determine if user is logged in
  if(props.currentUser === null || props.currentUser.userId === null) { //not undefined
    return <Navigate to="/login"/>
  }
  else { //otherwise, show the child route content
    return <Outlet />
  }
}

