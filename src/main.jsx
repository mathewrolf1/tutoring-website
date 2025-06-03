import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './pages/App.jsx';
import Support from './pages/Support.jsx';
import Shop from './pages/Shop.jsx';
// Assuming you created CartContext.jsx in 'src/context/CartContext.jsx'
import { CartProvider } from './context/CartContext.jsx'; // 1. Import CartProvider

import {
  createBrowserRouter,
  RouterProvider,
  // Route, // Not directly used here with this router setup
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
  // Future: Add a route for your CartPage here
  // {
  //   path: "cart",
  //   element: <CartPage />, // You'll create CartPage.jsx later
  // },
]);

createRoot(document.getElementById('root')).render(
  // You can keep StrictMode if you prefer, it's good for development.
  // If you removed it before for a specific reason, you can keep it removed.
  <StrictMode>
    <CartProvider> {/* 2. Wrap RouterProvider with CartProvider */}
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);