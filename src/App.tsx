import "./App.css";
import MainPhoto from "/main3.webp";
import MainPhotoMedium from "/main3-medium.webp";
import MainPhotoSmall from "/main3-small.webp";
import {
  ShoppingCardDropdown,
  ForHome,
  ForGaming,
  ForPhone,
  ForMusic,
} from "./components/icons/DropdownIcons";
import Header from "./components/Header";
import Dropdown from "./components/Dropdown";
import { DropdownItem } from "./types/DropdownItem";
import CatalogBlock from "./components/CatalogBlock";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  const dropdownItemsAll: DropdownItem[] = [
    { label: "For Home", icon: <ForHome /> },
    { label: "For Music", icon: <ForMusic /> },
    { label: "For Phone", icon: <ForPhone /> },
    { label: "For Gaming", icon: <ForGaming /> },
  ];

  return (
    <Router>
      <Header />
      <main className="relative mb-16">
        <h1 className="visually-hidden">Electronics Shop</h1>
        <div className="relative h-64 sm:h-72 md:h-96">
          <img
            className="absolute top-0 h-full w-screen object-cover"
            src={MainPhoto}
            fetchpriority="high"
            srcSet={`${MainPhotoSmall} 768w, ${MainPhotoMedium} 1280w, ${MainPhoto} 1700w`}
            alt="Modern Interior"
          />
          <p className="absolute -bottom-4 left-1/2 -translate-x-1/2 transform text-[10rem] font-semibold text-white sm:-bottom-6 sm:text-[12rem] md:-bottom-8 md:text-[14rem]">
            Shop
          </p>
        </div>
        <section className="relative -mt-16 h-full w-full px-4 md:px-10">
          <h2 className="visually-hidden">Catalog</h2>
          <div className="pointer-events-none -mb-1 h-3 w-full bg-gradient-to-t from-gray-400/50 to-transparent"></div>
          <div className="z-10 h-full w-full rounded-md bg-white">
            <h3 className="mb-1 p-2 text-center text-2xl font-semibold text-black md:mb-4 md:p-4 md:text-left md:text-3xl">
              Catalog
            </h3>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="items-center space-x-2 text-sm text-gray-700 md:flex-col">
                <h4 className="mb-2 text-base font-semibold text-black">
                  Category
                </h4>
                <Dropdown
                  buttonLabel="All Products"
                  buttonIcon={<ShoppingCardDropdown className="h-4 w-4" />}
                  items={dropdownItemsAll}
                />
              </div>
              <section className="h-full w-full px-4 md:p-0">
                <h4 className="visually-hidden">Products</h4>
                <CatalogBlock />
              </section>
            </div>
          </div>
        </section>
        <section className="flex">
          <h2 className="visually-hidden">Recomendations</h2>
        </section>
      </main>
      <footer className="flex h-full flex-col items-center space-y-4 px-10">
        <section className="mb-4 w-full space-y-4 rounded-xl bg-gradient-to-br from-gray-700 to-black p-4 text-black md:space-y-8 md:p-6">
          <h2 className="w-full text-3xl font-semibold text-white md:w-2/5 md:text-4xl lg:text-5xl">
            Subscribe for new arrivals
          </h2>
          <form className="w-full md:w-2/5" action="" method="post">
            <div className="flex flex-row items-center rounded-full bg-white pr-2">
              <label htmlFor="email" className="visually-hidden">
                Email:
              </label>
              <input
                id="email"
                type="email"
                name="email"
                aria-required="true"
                autoComplete="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-l-full bg-transparent py-2 pl-4 transition-all focus:outline-none md:p-2 md:px-6"
              />
              <button
                type="submit"
                className="rounded-full border border-white bg-black p-1.5 px-3 text-sm font-medium text-white md:px-5"
              >
                <span>Send</span>
              </button>
            </div>
          </form>
        </section>
        <div className="flex h-14 w-full items-center justify-between border-t border-t-gray-300 p-4 text-gray-500">
          <p className="">2024</p>
          <p className="">Levchenko Artem</p>
        </div>
      </footer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
