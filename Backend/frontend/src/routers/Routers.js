import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import BusServices from "../pages/BusServices";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ShowBookings from "../pages/ShowBookings";
import BookedDetails from "../pages/BookedDetails";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Routers = () => {
  return (
    <>
    <Header />
    <div>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/services" element={<BusServices/>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/bookings" element={<ShowBookings/>}/>
      <Route path='/bookdetail' element={<BookedDetails/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
    <Footer/>
    </>
  );
};

export default Routers;
