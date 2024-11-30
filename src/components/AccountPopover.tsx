import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useFloating,
  autoUpdate,
  FloatingPortal,
  offset,
  flip,
  shift,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserPopover() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { x, y, strategy, refs, context, placement } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift({ padding: 38 })],
    whileElementsMounted: autoUpdate,
  });

  const translate = {
    top: { translateY: 10 },
    bottom: { translateY: -10 },
    left: { translateX: 10 },
    right: { translateX: -10 },
  }[placement.split("-")[0]];

  const handleClick = () => {
    if (isLoggedIn) {
      setIsOpen((prev) => !prev);
    } else {
      navigate("/auth");
    }
  };

  return (
    <>
      <button
        title="Account"
        ref={refs.setReference}
        onClick={handleClick}
        className="flex h-full w-full items-center justify-center rounded-full border border-gray-200 transition-all hover:scale-105 hover:border-gray-300 active:scale-95"
      >
        {isLoggedIn ? (
          <>
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="sr-only">Account</span>
          </>
        ) : (
          <p className="mx-2 font-medium text-black">Login</p>
        )}
      </button>

      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                ...translate,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
                translateY: 0,
              }}
              exit={{ opacity: 0, ...translate }}
              transition={{ duration: 0.3 }}
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              }}
              className="rounded-lg border border-gray-200 bg-white p-4 text-black shadow-lg"
            >
              <h3 className="text-lg font-bold">User Info</h3>
              <p className="text-sm">Name: John Doe</p>
              <p className="text-sm">Email: john.doe@example.com</p>
              <button
                className="mt-2 rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsOpen(false);
                }}
              >
                Log Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}
