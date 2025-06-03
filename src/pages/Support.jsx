import React from "react";
import { Navbar } from "../../components/Navbar";
import { useState } from "react";


const Support = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (

        <div className={`min-h-screen transition-opacity duration-500 bg-white text-black`}> 
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <section id="contact" className="min-h-screen flex justify-center py-20 bg-white">
            <div className="z-0 w-full max-w-3xl mx-auto px-4 ">
                <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent text-center">
                    Contact information
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto text-center">
                    (123) 123-1234<br></br>Wolfie Grape Street, Sandersville<br></br>EledEdu@gmail.com
                </p>
                
            </div>
        </section>
        </div> 
        
    );
};

export default Support; 

