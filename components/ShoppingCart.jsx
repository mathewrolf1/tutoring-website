
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useCart } from '../src/context/CartContext';
import Jerky from '../src/models/Jerky';

export default function ShoppingCart({ cartOpen, setCartOpen }) {
  const { cartItems, removeItemFromCart, getCartTotalPrice } = useCart();

  return (
    <Dialog open={cartOpen} onClose={setCartOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        onClick={() => setCartOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                      >
                        <span className="sr-only">Close panel</span>
                        &times;
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                  {cartItems.length === 0 ? (
                    <div className="text-center text-gray-500">
                      <p className="text-lg mb-4">Your cart is empty.</p>
                      <a 
                        href="Shop"
                        onClick={() => setCartOpen(false)}
                        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 cursor-pointer"
                      >
                        Shop Here
                      </a>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((item) => {
                          const { flavor, size, quantity, id } = item;
                          const jerky = new Jerky(flavor, "", size);
                          const imageSrc = jerky.getImage();
                          const price = jerky.getPrice();
                          const label = flavor.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                          return (
                            <li key={id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src={imageSrc} alt={label} className="size-full object-cover" />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{label}</h3>
                                    <p className="ml-4">${(price * quantity).toFixed(2)}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">Size: {size}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {quantity}</p>
                                  <div className="flex">
                                    <button
                                      onClick={() => removeItemFromCart(id)}
                                      className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
                </div>

              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${getCartTotalPrice().toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        onClick={() => setCartOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                      >
                        Continue Shopping <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              )}
              </div> 
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
         
  );
}
