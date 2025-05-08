import React from "react";
import { Navbar } from "../../components/Navbar";
import { useState } from "react";


const Assess = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (

        <div className={`min-h-screen transition-opacity duration-500 bg-white text-black`}> 
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <div className="fixed top-100 text-5xl text-center justify-center">Assess Page</div>
        </div> 
        
    );
};

export default Assess 