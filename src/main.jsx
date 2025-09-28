import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './router/router';
import { AuthProvider } from './provider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

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
  </StrictMode>,
)
