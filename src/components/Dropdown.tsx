import { ReactElement, useState } from "react";
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

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="mb-2 flex flex-col space-x-2">
      <button
        className={`group mb-2 flex items-center justify-between rounded-lg border p-2 md:m-0 md:space-x-2 ${isOpen ? "bg-gray-50" : ""}`}
        onClick={toggleDropdown}
        type="button"
      >
        {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
        <p className="text-sm font-medium md:text-base">{buttonLabel}</p>
        <svg
          className={`ml-2 h-5 w-5 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"
            }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="flex flex-row items-start font-medium md:flex-col">
          {items.map((item, index) => (
            <li key={index} className="p-1 md:mt-1">
              <button className="group flex items-center space-x-1 md:space-x-2">
                {item.icon && item.icon}
                <p className="text-xs group-hover:text-gray-500 md:text-base">
                  {item.label}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
