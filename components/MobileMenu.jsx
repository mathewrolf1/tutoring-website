
export const MobileMenu = ({menuOpen, setMenuOpen}) => {


    return(
        <div className={`fixed top-0 left-0 w-full bg-white z-40 flex flex-col items-center justify-center
                         transition-all duration-300 ease-in-out 

                        ${menuOpen ? "h-screen opacity-100 pointer-event-auto" 
                                   :"h-0 opacity-0 pointer-events-none"}
                        `}>
        
                    <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-black text-3xl focus:outline-none cursor-pointer"
                                                               aria-label="Close Menu">    
                        &times;
                    </button> 
                <a href="#home" onClick={() => setMenuOpen(false)} 
                className={`text-2xl font-semibold text-yellow-500 my-4 transform transition-transform duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>Home</a>
                <a href="#tutors" onClick={() => setMenuOpen(false)} 
                className={`text-2xl font-semibold text-black my-4 transform transition-transform duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>Tutors</a>
                <a href="#contact" onClick={() => setMenuOpen(false)} 
                className={`text-2xl font-semibold text-black my-4 transform transition-transform duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>Contact</a>
                <a href="#review" onClick={() => setMenuOpen(false)} 
                className={`text-2xl font-semibold text-black my-4 transform transition-transform duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>Reviews</a>
        </div>
    );
};