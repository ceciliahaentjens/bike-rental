import React from 'react';
import './App.css';

// MUI
import { CssBaseline } from '@mui/material';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Footer />
    </React.Fragment>
  );
}

export default App;
