import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
// Import MockedProvider
import { MockedProvider } from '@apollo/client/testing/react'; 
import { LOGIN_USER } from './graphql/mutations/auth.graphql.ts';

// 1. Define the mock response
const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        email: 'test@example.com',
        password: 'password123',
      },
    },
    result: {
      data: {
        login: {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'Zuhair',
            lastName: 'Khan',
            role: 'CUSTOMER',
          },
        },
      },
    },
  },
];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* 2. Use MockedProvider instead of ApolloProvider */}
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    </BrowserRouter>
  </StrictMode>
);