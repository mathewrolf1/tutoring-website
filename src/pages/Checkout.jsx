import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { MobileMenu } from '../../components/MobileMenu';
import ShoppingCart from "../../components/ShoppingCart";
import { useCart } from '../context/CartContext';
import { useNavigate } from "react-router-dom";

// Simple Chevron Icon for Accordion
const ChevronDownIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const Checkout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [openSection, setOpenSection] = useState('delivery'); // 'delivery', 'payment'
    const { cartItems, getCartTotalPrice } = useCart();
    const navigate = useNavigate();

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const handlePlaceOrder = () => {
        navigate("/confirmation");
    };

    return (
        <div className="min-h-screen bg-gray-50 text-black">
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} cartOpen={cartOpen} setCartOpen={setCartOpen} />
            <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <ShoppingCart cartOpen={cartOpen} setCartOpen={setCartOpen} />

            <div className="container mx-auto px-4 lg:px-8 py-24">
                <h1 className="text-4xl font-extrabold text-center mb-10">Checkout</h1>
                <div className="flex flex-col-reverse lg:flex-row gap-12">

                    {/* Left Column: Checkout Form */}
                    <div className="w-full lg:w-3/5">
                        {/* Delivery Section */}
                        <div className="border-b">
                            <button onClick={() => toggleSection('delivery')} className="w-full flex justify-between items-center py-6 text-left">
                                <h2 className="text-2xl font-bold">Delivery</h2>
                                <div className={`transform transition-transform ${openSection === 'delivery' ? 'rotate-180' : ''}`}>
                                    <ChevronDownIcon />
                                </div>
                            </button>
                            {openSection === 'delivery' && (
                                <div className="pb-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input type="text" placeholder="First Name" className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                                        <input type="text" placeholder="Last Name" className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                                        <input type="email" placeholder="Email Address" className="p-3 border rounded-md col-span-2 focus:ring-2 focus:ring-blue-500 transition" />
                                        <input type="text" placeholder="Address" className="p-3 border rounded-md col-span-2 focus:ring-2 focus:ring-blue-500 transition" />
                                        <input type="text" placeholder="City" className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                                        <input type="text" placeholder="State" className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                                        <input type="text" placeholder="ZIP Code" className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Payment Section */}
                        <div className="border-b">
                            <button onClick={() => toggleSection('payment')} className="w-full flex justify-between items-center py-6 text-left">
                                <h2 className="text-2xl font-bold">Payment</h2>
                                <div className={`transform transition-transform ${openSection === 'payment' ? 'rotate-180' : ''}`}>
                                    <ChevronDownIcon />
                                </div>
                            </button>
                            {openSection === 'payment' && (
                                <div className="pb-8">
                                    <div className="grid grid-cols-1 gap-4">
                                        <input type="text" placeholder="Card Number" className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                                        <input type="text" placeholder="Name on Card" className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="Expiry Date (MM/YY)" className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                                            <input type="text" placeholder="CVV" className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 transition" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-2/5">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                            {cartItems.length > 0 ? (
                                <>
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between items-center mb-4">
                                            <div className="flex items-center">
                                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                                <div>
                                                    <p className="font-semibold">{item.name}</p>
                                                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                    <div className="flex justify-between font-bold text-xl mt-6 pt-4 border-t">
                                        <span>Total</span>
                                        <span>${getCartTotalPrice().toFixed(2)}</span>
                                    </div>
                                    <button
                                        onClick={handlePlaceOrder}
                                        className="w-full mt-6 bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                                    >
                                        Place Order
                                    </button>
                                </>
                            ) : (
                                <p className="text-gray-600">Your cart is empty.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;