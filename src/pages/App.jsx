// src/pages/App.jsx
import { useRef, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { MobileMenu } from '../../components/MobileMenu';
import ShoppingCart from '../../components/ShoppingCart';
import { Home } from '../../components/sections/Home';


const App = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)

      return (
      <>
      <div className={`min-h-screen bg-white text-black`}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} cartOpen={cartOpen} setCartOpen={setCartOpen}/>
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <ShoppingCart cartOpen={cartOpen} setCartOpen={setCartOpen}/>
        <Home /> 

      </div>
      </>
      );
    };

  
export default App;