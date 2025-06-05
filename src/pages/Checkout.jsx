import React from "react";
import { Navbar } from "../../components/Navbar";
import { useState } from "react";
import { MobileMenu } from '../../components/MobileMenu';
import ShoppingCart from "../../components/ShoppingCart";



const Checkout = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)

    return (

        <div className={`min-h-screen transition-opacity duration-500 bg-white text-black`}> 
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} cartOpen={cartOpen} setCartOpen={setCartOpen}/>
            <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <ShoppingCart cartOpen={cartOpen} setCartOpen={setCartOpen}/>
            
        </div> 
        
    );
};

export default Checkout; 
