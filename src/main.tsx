import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
// Import ApolloProvider and client
import { ApolloProvider } from '@apollo/client/react';
import client from './service/graphql';

import { CartProvider } from './contexts/CartContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* Use ApolloProvider to connect to real backend */}
        <ApolloProvider client={client}>
          <CartProvider>
            <App />
          </CartProvider>
        </ApolloProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);