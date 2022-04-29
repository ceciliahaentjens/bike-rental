import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import { ApolloProvider } from '@apollo/client';
import apolloClient from './apollo';

import { ContextProvider } from './contexts/pointOfSale';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <ContextProvider>
          <App/>
        </ContextProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);