import { useEffect, useState } from "react";
import {
  useClick,
  useDismiss,
  useInteractions,
  useRole,
  useFloating,
  FloatingPortal,
  autoUpdate,
  offset,
  flip,
  shift,
  FloatingFocusManager,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "./../../context/CartProvider";

export default function ShoppingCartPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useCart();

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const { x, y, strategy, refs, context, placement } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift({ padding: 38 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const totalAmount = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalQuantity = state.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <>
      <button
        title="Shopping Cart"
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-full w-full items-center justify-center rounded-full border border-gray-200 transition-all hover:scale-105 hover:border-gray-300 active:scale-95"
        type="button"
      >
        <AnimatePresence>
          {totalQuantity > 0 && (
            <motion.span
              initial={{ scale: 0, y: 20, x: -20 }}
              animate={{ scale: 1, y: 0, x: 0 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white"
            >
              {totalQuantity}
            </motion.span>
          )}
        </AnimatePresence>
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3H4.37144C5.31982 3 6.13781 3.66607 6.32996 4.59479L8.67004 15.9052C8.86219 16.8339 9.68018 17.5 10.6286 17.5H17.5"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.82422 7H19.6743C20.3386 7 20.8183 7.6359 20.6358 8.27472L19.6217 11.8242C19.2537 13.1121 18.0765 14 16.7371 14H8.27734"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="16.5"
            cy="20.5"
            r="0.5"
            fill="#000000"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="0.5"
            cy="0.5"
            r="0.5"
            transform="matrix(1 0 0 -1 10 21)"
            fill="#000000"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="visually-hidden">Shopping Cart</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <FloatingPortal>
            <FloatingFocusManager context={context}>
              <motion.section
                ref={refs.setFloating}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                }}
                {...getFloatingProps()}
                className="min-h-28 w-80 rounded-lg border bg-white p-4 text-black shadow-lg"
              >
                <h3 className="mb-2 text-lg font-bold">Your Cart</h3>
                <ul className="mb-3 space-y-1">
                  <AnimatePresence>
                    {state.items.length > 0 ? (
                      state.items.map((item) => (
                        <motion.li
                          initial={{ scale: 1, backgroundColor: "#ffffff" }}
                          animate={{ opacity: 1 }}
                          whileHover={{ backgroundColor: "#f1f1f1" }}
                          exit={{
                            scale: 1.2,
                            opacity: 0,
                            transition: { duration: 0.3 },
                          }}
                          transition={{ duration: 0.1 }}
                          key={item.id}
                          className="flex items-center justify-between rounded p-0.5 text-sm"
                        >
                          <span>{item.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="">
                              {item.quantity} x ${item.price}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.1 }}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="rounded-lg bg-red-500"
                            >
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
                                  fill="#ffffff"
                                />
                              </svg>
                            </motion.button>
                          </div>
                        </motion.li>
                      ))
                    ) : (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, transition: { duration: 0 } }}
                        transition={{ delay: 0.5, duration: 0.2 }}
                        className="pt-1 text-gray-500"
                      >
                        Cart is empty.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </ul>
                <AnimatePresence>
                  {state.items.length > 0 && (
                    <>
                      <motion.div
                        initial={false}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                        className="mb-3 flex items-center justify-between p-0.5 text-sm font-medium"
                      >
                        <span>Total:</span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </motion.div>
                      <motion.div
                        initial={false}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-between"
                      >
                        <Link
                          to="/cart"
                          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                          onClick={() => setIsOpen(false)}
                        >
                          Proceed to Cart
                        </Link>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </motion.section>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </>
  );
}
