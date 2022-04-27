import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// MUI
import { CssBaseline } from '@mui/material';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import PointsOfSaleList from './components/PointsOfSaleList';
import BikesList from './components/BikesList';
import BikeDetails from './components/BikeDetails';
import RentAdd from './components/RentAdd';

function checkIfPointOfSaleIsExpired() {
  const storedPointOfSaleTimestamp = localStorage.getItem('stored-point-of-sale-expire');
  
  // Check if the key exists in localStorage
  if (storedPointOfSaleTimestamp === null) { return; }

  const then = new Date(JSON.parse(storedPointOfSaleTimestamp));
  const now = new Date();

  // Je calcule la différence entre les deux dates (now & then)
  const msBetweenDates = Math.abs(then.getTime() - now.getTime());
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

  // Si la date est + 24 heures
  if (hoursBetweenDates > 24) {
    // Je supprime les éléments du localStorage
    localStorage.removeItem('stored-point-of-sale')
    localStorage.removeItem('stored-point-of-sale-expire')
  }
}

function App() {
  checkIfPointOfSaleIsExpired();
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<PointsOfSaleList />} />
        <Route path="/bikes" element={<BikesList />} />
        <Route path="/bikes/:id" element={<BikeDetails />} />
        <Route path="/rents/new/:id" element={<RentAdd />} />
        <Route path="/rents/new" element={<RentAdd />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
