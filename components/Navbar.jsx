import { useEffect } from "react"


export const Navbar = ({menuOpen, setMenuOpen}) => {

        useEffect(() => {
            document.body.style.overflow = menuOpen ? "hidden": "";
        }, [menuOpen]);

    return ( <nav className="top-0 h-20 w-full z-40 bg-[rgba(226, 226, 222, 0.51)] bg-gray-200 shadow-xl border-2">
        <div className="max-w-5xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
                
                <a href="/" className="font-mono text-3xl font-bold text-black"> 
                 High<span className="text-red-600">Steaks</span>
                </a>
                <div className={`w-7 h-5 relative cursor-pointer z-40 md:hidden text-xl top-2 ${menuOpen ? "opacity-0" : "opacity-100"}`} onClick={() => setMenuOpen((prev) => !prev)}>
                    &#9776; 
                </div>

                <div className="hidden md:flex items-center space-x-8 text-xl">
                    <a href="/" className="text-red-600 hover:underline transition-colors font-semibold">Home</a>
                    <a href="Shop" className="text-gray-700 hover:underline transition-colors">Shop</a>
                    <a href="Support" className="text-gray-700 hover:underline hover:text-orange-600 transition-colors">Support</a>

                </div>

            </div>
        </div>
    </nav>
    );
};

