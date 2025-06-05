import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { MobileMenu } from '../../components/MobileMenu';
import ShoppingCart from '../../components/ShoppingCart.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useLocation } from "react-router-dom";
import { jerkyCatalog, bagSizes } from '../models/Jerky.jsx';



// Custom hook to read query params
const useQuery = () => new URLSearchParams(useLocation().search);

const Shop = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); //__#+@_O#+_($_+@#($)_+I@)_I$)+ RIGHT NOW REVIEWCARDS WORK BUT IT IS BECAUSE OF THIS SECTION, 
  const query = useQuery();
  const initialFlavor = query.get("flavor");

  // Find jerky object matching initial flavor, fallback to first
  const initialJerky = jerkyCatalog.find(j => j.getFlavor() === initialFlavor) || jerkyCatalog[0];
  const [selectedJerky, setSelectedJerky] = useState(initialJerky);
  const [selectedBagSize, setSelectedBagSize] = useState(bagSizes[0].value);
  const [currentImage, setCurrentImage] = useState('');

  const { addItemToCart } = useCart(); //THIS IS REDUDENT AND I WOULD RECOMMEND JSUT UPDATING YOUR REVIEW CARDS TO USE THE OBJECTS

  // Update image whenever flavor or size changes
  useEffect(() => {
    try {
      selectedJerky.setSize(selectedBagSize);
      setCurrentImage(selectedJerky.getImage());
    } catch (e) {
      setCurrentImage('/images/jerky_placeholder.png');
    }
  }, [selectedJerky, selectedBagSize]);

  const handleFlavorChange = (e) => {
    const newFlavor = e.target.value;
    const newJerky = jerkyCatalog.find(j => j.getFlavor() === newFlavor);
    if (newJerky) setSelectedJerky(newJerky);
  };

  const handleBagSizeChange = (e) => setSelectedBagSize(e.target.value);

  const handleAddToCart = () => {
    const price = selectedJerky.getPrice();
    const flavorLabel = selectedJerky.getFlavor();
    const sizeLabel = bagSizes.find(s => s.value === selectedBagSize)?.label;

    const productToAdd = {
      id: `${flavorLabel}-${selectedBagSize}`,
      name: `${selectedJerky.getFlavor()} - ${sizeLabel}`,
      price,
      image: currentImage,
      flavor: flavorLabel,
      size: selectedBagSize,
    };

    addItemToCart(productToAdd);
    alert(`${productToAdd.name} has been added to your cart!`);
  };

  const handleBuyNow = () => {
    const price = selectedJerky.getPrice();
    const sizeLabel = bagSizes.find(s => s.value === selectedBagSize)?.label;

    const productToBuy = {
      id: `${selectedJerky.getFlavor()}-${selectedBagSize}`,
      name: `${selectedJerky.getFlavor()} - ${sizeLabel}`,
      price,
      image: currentImage,
      flavor: selectedJerky.getFlavor(),
      size: selectedBagSize,
    };

    alert(`Proceeding to buy ${productToBuy.name}! (This is a placeholder for checkout)`);
  };

  return (
    <div className="min-h-screen bg-gray-200 text-black">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} cartOpen={cartOpen} setCartOpen={setCartOpen}/>
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <ShoppingCart cartOpen={cartOpen} setCartOpen={setCartOpen}/>
      

      <div className="pt-24 px-4 md:px-8">
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-rose-300 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_2px_1.2px_rgba(0,0,0,0.8)]">
          Shop our Jerky
        </h1>

        <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
          {/* Filter Panel */}
          <div className="w-full md:w-1/3 lg:w-1/4 p-6 bg-gray-800 rounded-lg shadow-xl">
            <h2 className="text-3xl font-semibold mb-6 text-rose-500">Filters</h2>

            {/* Flavor Selector */}
            <div className="mb-6">
              <label htmlFor="flavor-select" className="block text-lg font-medium text-gray-300 mb-2">
                Flavor:
              </label>
              <select
                id="flavor-select"
                value={selectedJerky.getFlavor()}
                onChange={handleFlavorChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
              >
                {jerkyCatalog.map(j => (
                  <option key={j.getFlavor()} value={j.getFlavor()}>
                    {j.getFlavor().replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Bag Size Selector */}
            <div className="mb-6">
              <label htmlFor="bag-size-select" className="block text-lg font-medium text-gray-300 mb-2">
                Bag Size:
              </label>
              <select
                id="bag-size-select"
                value={selectedBagSize}
                onChange={handleBagSizeChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
              >
                {bagSizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Display */}
          <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col items-center p-6 bg-white rounded-lg shadow-xl">
            <img
              src={currentImage}
              alt={`Jerky - ${selectedJerky.getFlavor()} - ${selectedBagSize}`}
              className="max-w-full h-auto rounded-md object-contain mb-4"
              style={{ maxHeight: '400px', maxWidth: '400px' }}
            />
            <p className="text-xl text-gray-800 mb-2 font-semibold">
              {selectedJerky.getFlavor().replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} - {bagSizes.find(s => s.value === selectedBagSize)?.label}
            </p>
            <p className="text-2xl text-orange-600 font-bold mb-6">
              ${selectedJerky.getPrice()}
            </p>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-4 md:w-3/4 lg:w-2/3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;