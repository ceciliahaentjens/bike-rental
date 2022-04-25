import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// MUI
import { CssBaseline } from '@mui/material';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import PointsOfSaleList from './components/PointsOfSaleList';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<PointsOfSaleList />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
