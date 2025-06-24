import { useEffect } from "react"
import { useCart } from "../src/context/CartContext";


export const Navbar = ({menuOpen, setMenuOpen, cartOpen, setCartOpen}) => {

        const { getCartItemCount } = useCart();
        const totalItems = getCartItemCount() 
        
        useEffect(() => {
            document.body.style.overflow = menuOpen ? "hidden": "";
        }, [menuOpen]);
        
        useEffect(() => {
            document.body.style.overflow = cartOpen ? "hidden": "";
        }, [setCartOpen]);

    return ( <nav className="top-0 h-20 w-full z-40 bg-[rgba(226, 226, 222, 0.51)] bg-gray-200 shadow-xl border-2">
        <div className="max-w-5xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
                
                <a href="/" className="font-mono text-3xl font-bold text-black"> 
                 High<span className="text-red-600">Steaks</span>
                </a>


                <div className="hidden md:flex items-center space-x-8 text-xl">
                    <a href="/" className="text-red-600 hover:underline transition-colors font-semibold">Home</a>
                    <a href="Shop" className="text-gray-700 hover:underline transition-colors">Shop</a>
                    <a href="Support" className="text-gray-700 hover:underline hover:text-orange-600 transition-colors">Support</a>
                </div>

                <div className="grid grid-flow-col justify-items-end space-x-4">
                    <div className={`w-7 h-5 justify-center cursor-pointer z-40 top-2 ${cartOpen ? "opacity-0" : "opacity-100"}`} onClick={() => setCartOpen((prev) => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    
                        {totalItems > 0 && (
                        <div className="absolute top-9 px-4 font-semibold text-rose-500 drop-shadow-[0_.5px_1.2px_rgba(0,0,0,0.5)]"> 
                            {totalItems} 
                        </div>
                        )}
                    </div> 
                     
                    <div className={`w-7 h-5 relative cursor-pointer z-40 md:hidden text-xl ${menuOpen ? "opacity-0" : "opacity-100"}`} onClick={() => setMenuOpen((prev) => !prev)}>
                        &#9776; 
                    </div>
                </div>


            </div>
        </div> 
    </nav>
                
    );
};



