import React from "react";
import { Navbar } from "../../components/Navbar";
import { useState } from "react";
import { MobileMenu } from '../../components/MobileMenu';
import ShoppingCart from "../../components/ShoppingCart";


const Support = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)

    return (

        <div className={`min-h-screen transition-opacity duration-500 bg-white text-black`}> 
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} cartOpen={cartOpen} setCartOpen={setCartOpen}/>
            <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <ShoppingCart cartOpen={cartOpen} setCartOpen={setCartOpen}/>
            <section id="contact" className="min-h-screen flex justify-center py-20 bg-white">
            <div className="z-0 w-full max-w-3xl mx-auto px-4 ">
                <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-rose-300 to-orange-400 bg-clip-text text-transparent text-center drop-shadow-[0_2px_1.2px_rgba(0,0,0,0.8)]">
                    Contact information
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto text-center">
                    (916) 500-2770<br></br>Based in El Dorado Hills, California<br></br>jerky@highsteaksjerky.com
                </p>
                
            </div>
        </section>
        </div> 
        
    );
};

export default Support; 

