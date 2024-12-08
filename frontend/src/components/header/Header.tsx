import { Link } from "react-router-dom";
import AccountPopover from "./AccountPopover";
import ShoppingCartPopover from "./ShoppingCartPopover";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <header className="fixed top-0 z-30 h-14 w-full px-4 md:px-10">
      <nav className="flex h-full w-full justify-between rounded-b-md bg-white shadow">
        <Link
          className="group flex items-center justify-center space-x-1 pl-4 text-lg font-bold text-black active:scale-95"
          to="/"
        >
          <svg
            fill="#000000"
            className="h-8 w-8 group-hover:fill-gray-600"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23.74 5.135c0 0 0.453 1.922-0.995 2.188-1.005 0.177-2.63-0.823-3.448-1.818-1.010-1.229-0.88-2.198-0.099-3.052 1.177-1.307 3.198-0.802 3.198-0.802s-3.698-3.24-7.547-0.583c-3.427 2.359-2.443 5.573 0.651 8.38 2.786 2.536 0.563 5.318-2.25 4.958-1.922-0.245-2.708-1.792-2.25-2.74 0.401-0.813 1.781-1.313 1.781-1.313s-1.589-0.641-3.453 0.063c-1.682 0.63-3.063 2.016-2.953 5.495v16.104c0 0 1.734-2.135 3.776-4.313 2.281-2.453 3.323-4.109 5.667-3.917 4.438 0.276 7.646-1.698 9.828-4.859 4.188-6.083 0.906-12.88-1.906-13.792z" />
          </svg>
          <p className="group-hover:text-gray-600">Electronics</p>
        </Link>
        <ul className="flex items-center justify-center px-4">
          {user && user.user?.role === "admin" && (
            <li className="flex h-4/5 p-1.5">
              <Link
                to="/admin"
                className="flex h-full w-full items-center rounded-md border border-black bg-black px-2 text-white hover:scale-105"
              >
                Admin Panel
              </Link>
            </li>
          )}

          <li className="flex aspect-square h-full p-1.5">
            <ShoppingCartPopover />
          </li>
          <li className="flex aspect-square h-full p-1.5">
            <AccountPopover />
          </li>
        </ul>
      </nav>
    </header>
  );
}
