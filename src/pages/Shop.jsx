import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { MobileMenu } from '../../components/MobileMenu';
import { useCart } from '../context/CartContext.jsx'; // 1. Import useCart
import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


// Product image paths (replace with actual URLs or paths)
const productImages = {
  spicy_sweet_garlic: {
    small: '/images/jerky_spicy_small.png',
    medium: '/images/jerky_spicy_medium.png',
    large: '/images/jerky_spicy_large.png',
    family: '/images/jerky_spicy_family.png',
  },
  lemongrass: {
    small: '/images/jerky_lemongrass_small.png',
    medium: '/images/jerky_lemongrass_medium.png',
    large: '/images/jerky_lemongrass_large.png',
    family: '/images/jerky_lemongrass_family.png',
  },
  mild: {
    small: '/images/jerky_mild_small.png',
    medium: '/images/jerky_mild_medium.png',
    large: '/images/jerky_mild_large.png',
    family: '/images/jerky_mild_family.png',
  },
  ghost_pepper: {
    small: '/images/jerky_ghost_small.png',
    medium: '/images/jerky_ghost_medium.png',
    large: '/images/jerky_ghost_large.png',
    family: '/images/jerky_ghost_family.png',
  },
};

// Flavor and size options
const flavors = [
  { value: 'spicy_sweet_garlic', label: 'Spicy Sweet Garlic' },
  { value: 'lemongrass', label: 'Lemongrass' },
  { value: 'mild', label: 'Mild' },
  { value: 'ghost_pepper', label: 'Ghost Pepper' },
];

const bagSizes = [
  { value: 'small', label: 'Small Bag (2 oz)' },
  { value: 'medium', label: 'Medium Bag (4 oz)' },
  { value: 'large', label: 'Large Bag (8 oz)' },
  { value: 'family', label: 'Family Pack (16 oz)' },
];

// Placeholder pricing - replace with your actual pricing logic
const productPrices = {
  spicy_sweet_garlic: { small: 17, medium: 25, large: 35, family: 60 },
  lemongrass: { small: 17, medium: 25, large: 35, family: 60 },
  mild: { small: 17, medium: 25, large: 35, family: 60 },
  ghost_pepper: { small: 18, medium: 27, large: 38, family: 65 }, // Example: Ghost pepper is pricier
};


const Shop = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const query = useQuery();
  const initialFlavor = query.get("flavor");
  const [selectedFlavor, setSelectedFlavor] = useState(
    initialFlavor && productImages[initialFlavor] ? initialFlavor : flavors[0].value
  );
  const [selectedBagSize, setSelectedBagSize] = useState(bagSizes[0].value);
  const [currentImage, setCurrentImage] = useState('');

  const { addItemToCart } = useCart(); // 2. Access addItemToCart from context

  // Update image when selection changes
  useEffect(() => {
    if (productImages[selectedFlavor]?.[selectedBagSize]) {
      setCurrentImage(productImages[selectedFlavor][selectedBagSize]);
    } else {
      setCurrentImage('/images/jerky_placeholder.png');
    }
  }, [selectedFlavor, selectedBagSize]);

  const handleFlavorChange = (e) => setSelectedFlavor(e.target.value);
  const handleBagSizeChange = (e) => setSelectedBagSize(e.target.value);

  // Add to Cart button handler
  const handleAddToCart = () => {
    // 3. Update productToAdd with price and image, then call context function
    const price = productPrices[selectedFlavor]?.[selectedBagSize] || 17; // Fallback price if not found

    const productToAdd = {
      id: `${selectedFlavor}-${selectedBagSize}`, // Unique ID for this product variant
      name: `${flavors.find(f => f.value === selectedFlavor)?.label} - ${bagSizes.find(s => s.value === selectedBagSize)?.label}`,
      price: price, // Include the price
      image: currentImage, // Include the current image
      flavor: selectedFlavor,
      size: selectedBagSize,
      // quantity will be handled by addItemToCart in the context (defaults to 1 if new)
    };

    addItemToCart(productToAdd); // Call the function from CartContext
    console.log('Adding to cart via context:', productToAdd);
    alert(`${productToAdd.name} has been added to your cart!`);
  };

  // Buy Now button handler
  const handleBuyNow = () => {
    const price = productPrices[selectedFlavor]?.[selectedBagSize] || 17;
    const productToBuy = {
      id: `${selectedFlavor}-${selectedBagSize}`,
      name: `${flavors.find(f => f.value === selectedFlavor)?.label} - ${bagSizes.find(s => s.value === selectedBagSize)?.label}`,
      price: price,
      image: currentImage,
      flavor: selectedFlavor,
      size: selectedBagSize,
    };
    console.log('Buying now:', productToBuy);
    // For a real "Buy Now", you might add to cart and redirect, or go to a special checkout
    // addItemToCart({ ...productToBuy, quantity: 1 }); // Optionally add to cart first
    // window.location.href = '/checkout'; // Then redirect
    alert(`Proceeding to buy ${productToBuy.name}! (This is a placeholder for checkout)`);
  };

  return (
    <div className="min-h-screen bg-gray-200 text-black"> {/* Changed text-antiquewhite to text-black for better readability on gray-200 */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="pt-24 px-4 md:px-8">
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-rose-300 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
">
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
                value={selectedFlavor}
                onChange={handleFlavorChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
              >
                {flavors.map((flavor) => (
                  <option key={flavor.value} value={flavor.value}>
                    {flavor.label}
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
          <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col items-center p-6 bg-white rounded-lg shadow-xl"> {/* Changed product display background to white */}
            <img
              src={currentImage}
              alt={`Jerky - ${selectedFlavor} - ${selectedBagSize}`}
              className="max-w-full h-auto rounded-md object-contain mb-4"
              style={{ maxHeight: '400px', maxWidth: '400px' }} // Slightly reduced max size for better layout
            />
            <p className="text-xl text-gray-800 mb-2 font-semibold"> {/* Adjusted text color and added font-semibold */}
              {flavors.find(f => f.value === selectedFlavor)?.label} - {bagSizes.find(s => s.value === selectedBagSize)?.label}
            </p>
            <p className="text-2xl text-orange-600 font-bold mb-6">
              ${productPrices[selectedFlavor]?.[selectedBagSize] || '17.00'} {/* Display the price */}
            </p>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-4 md:w-3/4 lg:w-2/3"> {/* Constrained width of buttons on larger screens */}
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