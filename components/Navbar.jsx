import { useEffect } from "react"


export const Navbar = ({menuOpen, setMenuOpen}) => {

        useEffect(() => {
            document.body.style.overflow = menuOpen ? "hidden": "";
        }, [menuOpen]);

    return ( <nav className="fixed top-0 h-20 w-full z-40 bg-[rgba(226, 226, 222, 0.51)] bg-yellow-100 border-b border-white/10 shadow-xl">
        <div className="max-w-5xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
                
                <a href="#home" className="font-mono text-3xl font-bold text-black"> 
                 Eled<span className="text-yellow-500">Tutors</span>
                </a>
                <div className={`w-7 h-5 relative cursor-pointer z-40 md:hidden text-xl top-2 ${menuOpen ? "opacity-0" : "opacity-100"}`} onClick={() => setMenuOpen((prev) => !prev)}>
                    &#9776; 
                </div>

                <div className="hidden md:flex items-center space-x-8 text-xl">
                    <a href="#home" className="text-yellow-600 hover:underline transition-colors">Home</a>
                    <a href="#tutors" className="text-gray-700 hover:underline transition-colors">Tutors</a>
                    <a href="#contact" className="text-gray-700 hover:underline transition-colors">Contact</a>
                    <a href="#review" className="text-gray-700 hover:underline transition-colors">Reviews</a>

                </div>

            </div>
        </div>
    </nav>
    );
};

