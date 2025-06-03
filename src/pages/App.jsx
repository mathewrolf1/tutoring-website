// src/pages/App.jsx
import { useRef, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { MobileMenu } from '../../components/MobileMenu';
import { Home } from '../../components/sections/Home';


const App = () => {
    const [menuOpen, setMenuOpen] = useState(false)

      return (
      <>
      <div className={`min-h-screen bg-white text-black`}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <Home />

      </div>
      </>
      );
    };

  
export default App;