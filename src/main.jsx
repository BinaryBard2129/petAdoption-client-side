import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router';
import { router } from './Routes/Router.jsx';
import AuthProvider from './Pages/AuthProvider.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe **public key**
const stripePromise = loadStripe("pk_test_YourPublishableKeyHere");

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router}></RouterProvider>
        </Elements>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
