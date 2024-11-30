import { ReactElement, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DropdownItem } from "../types/DropdownItem";

interface DropdownProps {
  buttonLabel: string;
  buttonIcon?: ReactElement;
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonLabel,
  buttonIcon,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="mb-2 flex flex-col"
    >
      <motion.button
        initial={false}
        variants={{
          open: { backgroundColor: "#e5e7eb" },
          closed: { backgroundColor: "#ffffff" },
        }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="mb-2 flex w-full items-center justify-between rounded-lg border p-3 md:m-0 lg:justify-start"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {buttonIcon && <>{buttonIcon}</>}
        <p className="text-nowrap font-medium md:ml-2 md:mr-4 md:text-sm">
          {buttonLabel}
        </p>
        <motion.svg
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2, ease: "linear" }}
          className="h-2 w-2"
          viewBox="0 -4.5 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-260.000000, -6684.000000)"
              fill="#000000"
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M223.707692,6534.63378 L223.707692,6534.63378 C224.097436,6534.22888 224.097436,6533.57338 223.707692,6533.16951 L215.444127,6524.60657 C214.66364,6523.79781 213.397472,6523.79781 212.616986,6524.60657 L204.29246,6533.23165 C203.906714,6533.6324 203.901717,6534.27962 204.282467,6534.68555 C204.671211,6535.10081 205.31179,6535.10495 205.70653,6534.69695 L213.323521,6526.80297 C213.714264,6526.39807 214.346848,6526.39807 214.737591,6526.80297 L222.294621,6534.63378 C222.684365,6535.03868 223.317949,6535.03868 223.707692,6534.63378"
                  id="arrow_up-[#337]"
                ></path>
              </g>
            </g>
          </g>
        </motion.svg>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-row items-start space-x-0 font-medium sm:space-x-2 lg:flex-col lg:space-x-0"
          >
            {items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -10 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.1,
                }}
                className="w-full md:pt-1"
              >
                <button className="flex h-full w-full items-center justify-center space-x-1 text-nowrap rounded-md border border-gray-200 px-1 py-3 md:justify-start md:space-x-2 md:pl-6 lg:py-2">
                  {item.icon && item.icon}
                  <p className="text-xs">{item.label}</p>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dropdown;
