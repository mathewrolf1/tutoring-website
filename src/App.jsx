import { useState } from 'react';
import './App.css'
import { LoadingScreen } from '../components/LoadingScreen';
import { Navbar } from '../components/Navbar';
import { MobileMenu } from '../components/MobileMenu';
import { Home } from '../components/sections/Home';
import { Contact } from '../components/sections/Contact';
import { Review } from '../components/sections/Review'; 
import "./index.css"

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)


  return ( 
  <>{!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)}/>}
    <div className={`min-h-screen transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} bg-white text-black`}> 
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <Home />
      <Review />
      <Contact />
    </div> 
  </>
  );
}

export default App;


