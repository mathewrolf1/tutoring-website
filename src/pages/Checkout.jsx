import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { MobileMenu } from '../../components/MobileMenu';
import ShoppingCart from "../../components/ShoppingCart";
import { useCart } from '../context/CartContext';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// Simple Chevron Icon for Accordion
const ChevronDownIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const Checkout = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [openSection, setOpenSection] = useState('delivery');
    const { cartItems } = useCart();
    const [{ isPending }] = usePayPalScriptReducer();

    // Creates the order on your server
    const createOrder = () => {
        // This is the new, robust version
        console.log("1. Firing createOrder. Contacting server...");
        return fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: cartItems }),
        })
        .then((response) => {
            if (!response.ok) {
                // We'll get the server's error message
                return response.text().then(text => {
                    console.error("ERROR from server:", text);
                    throw new Error(`Server returned an error: ${response.statusText}`);
                });
            }
            console.log("2. Server responded OK. Parsing JSON...");
            return response.json();
        })
        .then((order) => {
            console.log("3. Order created successfully. Order ID:", order.orderID);
            return order.orderID;
        })
        .catch(err => {
            console.error("A critical error occurred in createOrder:", err);
            // We re-throw the error so PayPal's onError can catch it
            throw err;
        });
    };

    // Captures the order on your server
    const onApprove = (data) => {
        console.log("4. Payment approved by user. Capturing on server...", data);
        return fetch(`/api/orders/${data.orderID}/capture`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to capture order on server.");
            }
            console.log("5. Server capture response OK.");
            return response.json();
        })
        .then((details) => {
            console.log("6. Transaction complete!", details);
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
        });
    };

    // Handles errors from the entire PayPal flow
    const onError = (err) => {
        console.error("PayPal onError callback caught an error:", err);
        alert("An error occurred with your payment. Please check the browser console for details.");
    };

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

     return (
        <div className="min-h-screen bg-gray-50 text-black">
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} cartOpen={cartOpen} setCartOpen={setCartOpen} />
            <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <ShoppingCart cartOpen={cartOpen} setCartOpen={setCartOpen} />

            <div className="container mx-auto px-4 lg:px-8 py-24">
                <h1 className="text-4xl font-extrabold text-center mb-10">Checkout</h1>
                <div className="flex flex-col-reverse lg:flex-row gap-12">
                    <div className="w-full lg:w-3/5">
                        <div className="border-b">
                           {/* Delivery section content goes here */}
                        </div>
                        <div className="border-b">
                            <button onClick={() => toggleSection('payment')} className="w-full flex justify-between items-center py-6 text-left">
                                <h2 className="text-2xl font-bold">Payment</h2>
                                <div className={`transform transition-transform ${openSection === 'payment' ? 'rotate-180' : ''}`}>
                                    <ChevronDownIcon />
                                </div>
                            </button>
                            {openSection === 'payment' && (
                                <div className="pb-8">
                                    {isPending ? (
                                        <p>LOADING PAYPAL...</p>
                                    ) : (
                                        <PayPalButtons
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                            onError={onError}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full lg:w-2/5">
                        {/* Order summary content goes here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;