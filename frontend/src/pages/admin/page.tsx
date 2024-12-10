import { RootState } from "@/store";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Users from "./Users";
import Orders from "./Orders";
import Products from "./Products";

const pages: string[] = ["Users", "Orders", "Products", "Brands", "Categories"];

export default function Admin() {
  const user = useSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState<string>("Users");

  if (!user.user || !user.token) {
    return <div>Unauthorized</div>;
  }

  if (user.user.role !== "admin") {
    return <div>Access denied</div>;
  }

  const renderContent = () => {
    switch (currentPage) {
      case "Users":
        return <Users />;
      case "Orders":
        return <Orders />;
      case "Products":
        return <Products />;
      case "Brands":
        return <div>Список брендів</div>;
      case "Categories":
        return <div>Список категорій</div>;
      default:
        return <div>Виберіть пункт меню</div>;
    }
  };

  return (
    <main className="relative flex h-screen w-screen flex-row bg-gray-300 p-4 text-neutral-900">
      <h1 className="sr-only">Admin Page</h1>
      <div className="mr-4 flex w-52 flex-col rounded-xl border-2 border-gray-200 bg-white p-4">
        <Link
          className="group flex items-center justify-center space-x-1 py-4 text-lg font-bold text-black active:scale-95"
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
          <p className="group-hover:text-gray-600">Home</p>
        </Link>
        <hr className="mb-6 border-gray-200" />
        <ul className="flex h-full w-full flex-col items-center space-y-6">
          {pages.map((page, index) => (
            <li key={index} className="w-full">
              <button
                onClick={() => setCurrentPage(page)}
                className={`w-full rounded-full p-2 shadow transition-all hover:scale-105 ${currentPage === page ? "bg-black text-white" : ""}`}
                type="button"
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
        <hr className="mt-auto border-gray-200" />
        <div className="flex flex-col items-center">
          <p className="py-4 font-medium">Levchenko Artem</p>
        </div>
      </div>
      <section className="flex h-full w-full flex-col overflow-hidden">
        <h2 className="sr-only">Dashboard</h2>
        <AnimatePresence>{renderContent()}</AnimatePresence>
      </section>
    </main>
  );
}
