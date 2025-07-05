import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './pages/App.jsx';
import Support from './pages/Support.jsx';
import Shop from './pages/Shop.jsx';
import Checkout from './pages/Checkout.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "support",
    element: <Support/>,
  },
   {
    path: "shop",
    element: <Shop/>,
  },
  {
    path: "checkout",
    element: <Checkout/>,
  },
]);

const initialOptions = {
    "client-id": "sd",// Replace with your actual PayPal client ID
    currency: "USD",
    intent: "capture",
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
        <PayPalScriptProvider options={initialOptions}>
            <RouterProvider router={router} />
        </PayPalScriptProvider>
    </CartProvider>
  </StrictMode>
);