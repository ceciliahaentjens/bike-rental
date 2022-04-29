import React, { useEffect } from 'react';
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

// Contexte
import { usePointOfSaleContext } from './contexts/pointOfSale';

const moment = require('moment');

function checkIfPointOfSaleIsExpired(storedPointOfSale: any) {
  // Check if the key exists in localStorage
  if (storedPointOfSale.expire === '') { return; }
  
  const now = moment();
  const then = moment(JSON.parse(storedPointOfSale.expire));

  if (now.isAfter(then)) {
    // Je supprime les éléments du localStorage
    localStorage.removeItem('point-of-sale');
  }
}

function App() {
  // Je récupère le point de vente enregistré par l'utilisateur
  const { storedPointOfSale } = usePointOfSaleContext();

  // Je vérifie seulement au premier rendu si le point de vente a expiré
  useEffect(() => {
    checkIfPointOfSaleIsExpired(storedPointOfSale);
  }, [])

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
        <Route path="/rents/stop/:id" element={<RentStop />} />
        <Route path="/rents/stop" element={<RentStop />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
