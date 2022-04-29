import React, { useEffect, useState } from 'react';
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
import RentStop from './components/RentStop';

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

  const [storedPointOfSale, setStoredPointOfSale] = useState(() => {
    const storedPointOfSale = localStorage.getItem('stored-point-of-sale');
    return storedPointOfSale !== null ? JSON.parse(storedPointOfSale) : null; 
  })

  // Si le point de vente enregistré par l'utilisateur change, je change le localStorage
  useEffect(() => {
    localStorage.setItem('stored-point-of-sale', JSON.stringify(storedPointOfSale));
  }, [storedPointOfSale]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header storedPointOfSale={storedPointOfSale} />
      <Routes>
        <Route path="/" element={<PointsOfSaleList storedPointOfSale={storedPointOfSale} setStoredPointOfSale={setStoredPointOfSale} />} />
        <Route path="/bikes" element={<BikesList />} />
        <Route path="/bikes/:id" element={<BikeDetails />} />
        <Route path="/rents/new/:id" element={<RentAdd />} />
        <Route path="/rents/new" element={<RentAdd />} />
        <Route path="/rents/stop/:id" element={<RentStop />} />
        <Route path="/rents/stop" element={<RentStop />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
