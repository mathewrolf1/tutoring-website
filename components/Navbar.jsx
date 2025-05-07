import { useEffect } from "react"






export const Navbar = ({menuOpen, setMenuOpen}) => {

        useEffect(() => {
            document.body.style.overflow = menuOpen ? "hidden": "";
        }, [menuOpen]);

    return ( <nav className="fixed top-0 w-full z-40 bg-[rgba(226, 226, 222, 0.51)] backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
                <a href="#home" className="font-mono text-xl font-bold text-black"> 
                <img src="eledheader.png" className="w-11 h-8 fixed left-10" alt="Eled Tutoring"></img> Eled<span className="text-yellow-500">Tutors</span>
                </a>
                <div className={`w-7 h-5 relative cursor-pointer z-40 md:hidden text-md top-2 ${menuOpen ? "opacity-0" : "opacity-100"}`} onClick={() => setMenuOpen((prev) => !prev)}>
                    &#9776; 
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    <a href="#home" className="text-yellow-500 hover:text-white transition-colors">Home</a>
                    <a href="#about" className="text-gray-500 hover:text-white transition-colors">About</a>
                    <a href="#tutors" className="text-gray-500 hover:text-white transition-colors">Tutors</a>
                    <a href="#contact" className="text-gray-500 hover:text-white transition-colors">Contact</a>

                </div>

            </div>
        </div>
    </nav>
    );
};

