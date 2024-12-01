import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./../../context/CartProvider";
import { Link } from "react-router-dom";
import { useState } from "react";

const discount: number = 0.2;
const tax: number = 0.05;

export default function Cart() {
  const { state, dispatch } = useCart();
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const totalAmount = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const calculateDiscount = (amount: number) => {
    return amount * discount;
  };

  const calculateTax = (amount: number) => {
    return amount * tax;
  };

  return (
    <>
      <main className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-gradient-to-t from-gray-100 to-gray-300 px-4 py-10">
        <h1 className="sr-only">Shopping Cart</h1>
        <Link
          to="/"
          className="group absolute bottom-0 flex h-10 w-40 items-center justify-center rounded border-gray-100 bg-white pr-2 shadow transition-all hover:w-20 hover:border sm:bottom-auto sm:left-0 sm:h-32 sm:w-14 sm:justify-end"
        >
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="group-hover:stroke-gray-700"
              d="M4 12H20M4 12L8 8M4 12L8 16"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <motion.section
          layout
          transition={{ duration: 0.4 }}
          className="relative flex h-full w-full flex-col space-y-4 overflow-hidden rounded-lg bg-white p-4 text-gray-800 shadow md:w-2/3 lg:w-1/2"
        >
          <h2 className="text-2xl font-medium text-black">Cart</h2>
          <hr className="border-gray-300" />
          <div className="h-full scroll-mt-4 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400">
            <motion.ul
              layout
              className="relative flex min-h-full flex-col space-y-2 overflow-hidden"
            >
              <AnimatePresence>
                {state.items.length === 0 && (
                  <motion.li
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="flex flex-row items-center justify-center"
                  >
                    <span className="text-gray-500">Cart is empty</span>
                  </motion.li>
                )}
                {state.items.map((item) => (
                  <motion.li
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    key={item.id}
                    className="flex flex-row"
                  >
                    <h3 className="sr-only">Product</h3>
                    <div className="flex w-3/5 flex-row space-x-4">
                      <div className="aspect-square h-20 rounded-lg border border-gray-300 bg-gray-100 text-xs">
                        <img src="" alt={item.name} className="h-full w-full" />
                      </div>
                      <div className="flex flex-col justify-center space-y-2">
                        <span>{item.name}</span>
                        <span className="text-sm text-gray-500">Sky Blue</span>
                      </div>
                    </div>
                    <div className="flex w-2/5 flex-row items-center justify-between">
                      <div className="flex flex-row items-center justify-between rounded-lg border border-gray-300">
                        <button
                          disabled={item.quantity === 1}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="group h-full w-full rounded-l-lg p-1.5"
                        >
                          <span className="sr-only">Subtract</span>
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="Complete">
                              <g id="minus">
                                <line
                                  className="group-disabled:stroke-gray-400"
                                  fill="none"
                                  stroke="#000000"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  x1="4"
                                  x2="20"
                                  y1="12"
                                  y2="12"
                                />
                              </g>
                            </g>
                          </svg>
                        </button>
                        <span className="px-1">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-full w-full rounded-r-lg p-1.5"
                        >
                          <span className="sr-only">Add</span>
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 12H20M12 4V20"
                              stroke="#000000"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className="text-black">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="group rounded-lg p-1"
                      >
                        <span className="sr-only">Remove</span>
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="group-hover:fill-red-500"
                            d="M5.12817 8.15391C5.12817 10.4103 5.12817 13.5898 5.12817 15.1283C5.23074 16.4616 5.3333 18.2052 5.43587 19.436C5.53843 20.8719 6.7692 22.0001 8.2051 22.0001H15.7948C17.2307 22.0001 18.4615 20.8719 18.5641 19.436C18.6666 18.2052 18.7692 16.4616 18.8718 15.1283C18.9743 13.5898 18.8718 10.4103 18.8718 8.15391H5.12817Z"
                            fill="#666"
                          />
                          <path
                            className="group-hover:fill-red-500"
                            d="M19.1795 5.07698H16.6154L15.7949 3.53852C15.2821 2.61545 14.359 2.00006 13.3333 2.00006H10.8718C9.84615 2.00006 8.82051 2.61545 8.41026 3.53852L7.38462 5.07698H4.82051C4.41026 5.07698 4 5.48724 4 5.8975C4 6.30775 4.41026 6.71801 4.82051 6.71801H19.1795C19.5897 6.71801 20 6.41032 20 5.8975C20 5.38468 19.5897 5.07698 19.1795 5.07698ZM9.12821 5.07698L9.64103 4.25647C9.84615 3.84621 10.2564 3.53852 10.7692 3.53852H13.2308C13.7436 3.53852 14.1538 3.74365 14.359 4.25647L14.8718 5.07698H9.12821Z"
                            fill="#666"
                          />
                        </svg>
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>
          <hr className="border-gray-300" />
          <motion.section
            layout
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col"
          >
            <h3 className="sr-only">Payment Details</h3>
            <section className="relative mb-4 flex w-full flex-col">
              <h4 className="sr-only">Your promocode</h4>
              <div className="relative flex flex-col">
                <label htmlFor="promo" className="sr-only">
                  Your promocode
                </label>
                <input
                  id="promo"
                  type="text"
                  placeholder="Promocode"
                  className={`rounded-lg border border-gray-300 bg-transparent p-1.5 focus:border-gray-500 focus:outline-none ${promoApplied && "border-2 border-green-500"}`}
                />
                <motion.button
                  initial={false}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPromoApplied(true)}
                  className="absolute bottom-0 right-0 top-0 rounded-lg border border-gray-300 bg-white p-1 px-2"
                >
                  <span className="font-medium">Apply</span>
                </motion.button>
              </div>
              <p className="pt-2 text-sm text-gray-400">20% off discount</p>
            </section>
            <hr className="border-dashed border-gray-300" />
            <section className="my-4 flex flex-col">
              <h4 className="sr-only">Total calculation</h4>
              <div className="mb-3 flex flex-row justify-between">
                <h5 className="text-base">Subtotal</h5>
                <span className="">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex flex-col space-y-1 text-sm text-gray-500">
                <div className="flex flex-row justify-between">
                  <span>Discount</span>
                  <span>
                    {promoApplied
                      ? `(${discount * 100}%) - $${calculateDiscount(totalAmount).toFixed(2)}`
                      : " - $0"}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span>Tax</span>
                  <span>
                    ({tax * 100}%) + ${calculateTax(totalAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            </section>
            <hr className="border-dashed border-gray-300" />
            <section className="mt-4">
              <h4 className="sr-only">Total amount</h4>
              <div className="flex flex-row justify-between">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-medium">
                  $
                  {(
                    totalAmount -
                    calculateDiscount(totalAmount) +
                    calculateTax(totalAmount)
                  ).toFixed(2)}
                </span>
              </div>
            </section>
          </motion.section>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <span>Confirm</span>
          </button>
        </motion.section>
      </main>
    </>
  );
}
