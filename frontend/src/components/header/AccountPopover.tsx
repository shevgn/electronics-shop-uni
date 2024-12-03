import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useFloating,
  autoUpdate,
  FloatingPortal,
  offset,
  flip,
  shift,
  FloatingFocusManager,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/features/userSlice";

export default function UserPopover() {
  const { user, token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
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

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleClick = () => {
    if (token) {
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
        {...getReferenceProps()}
        onClick={handleClick}
        className="flex h-full w-full items-center justify-center rounded-full border border-gray-200 transition-all hover:scale-105 hover:border-gray-300 active:scale-95"
      >
        {token ? (
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">Account</span>
          </>
        ) : (
          <p className="mx-2 font-medium text-black">Login</p>
        )}
      </button>

      <AnimatePresence>
        {isOpen && token && (
          <FloatingPortal>
            <FloatingFocusManager context={context}>
              <motion.section
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
                {...getFloatingProps()}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                }}
                className="rounded-lg border bg-white p-4 text-black shadow-lg"
              >
                <h3 className="mb-2 text-lg font-bold">User Info</h3>
                <p className="text-sm">Name: {user.name}</p>
                <p className="text-sm">Email: {user.email}</p>
                <button
                  className="mt-3 rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                  onClick={() => {
                    setIsOpen(false);
                    dispatch(logout());
                  }}
                >
                  Log Out
                </button>
              </motion.section>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </>
  );
}
