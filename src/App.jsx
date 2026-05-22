import React, {useState} from 'react';
import { Routes, Route } from 'react-router';
import FeedbackPage from "./components/FeedbackPage";
import NavBar from "./components/NavBar"
import Header from './components/Header'
import Footer from './components/Footer'
import Title from './components/Title'

export default function App(props) {
    return (
        <>
        <NavBar />
        <Header />
        <Title />
        <FeedbackPage />
        <Footer />
            
        </>
    );
}