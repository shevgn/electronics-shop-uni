import MainPhoto from "/main3.webp";
import MainPhotoMedium from "/main3-medium.webp";
import MainPhotoSmall from "/main3-small.webp";
import {
  ShoppingCardDropdown,
  ForHome,
  ForGaming,
  ForPhone,
  ForMusic,
} from "../../components/icons/DropdownIcons";
import Header from "../../components/header/Header";
import Dropdown from "./Dropdown";
import { TDropdownItem } from "../../types/index";
import CatalogBlock from "./CatalogBlock";
import Footer from "../../components/Footer";

export default function Home() {
  const dropdownItemsAll: TDropdownItem[] = [
    { label: "For Home", icon: <ForHome /> },
    { label: "For Music", icon: <ForMusic /> },
    { label: "For Phone", icon: <ForPhone /> },
    { label: "For Gaming", icon: <ForGaming /> },
  ];
  return (
    <>
      <Header />
      <main className="relative mb-16">
        <h1 className="visually-hidden">Electronics Shop</h1>
        <div className="relative h-64 sm:h-72 md:h-96">
          <img
            className="pointer-events-none absolute top-0 h-full w-screen select-none object-cover"
            src={MainPhoto}
            srcSet={`${MainPhotoSmall} 768w, ${MainPhotoMedium} 1280w, ${MainPhoto} 1700w`}
            alt="Modern Interior"
          />
          <p className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 transform select-none text-[10rem] font-semibold text-white sm:-bottom-6 sm:text-[12rem] md:-bottom-8 md:text-[14rem]">
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
            <div className="flex flex-col md:space-x-4 lg:flex-row">
              <div className="items-center text-sm text-gray-700 md:flex-col">
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
      <Footer />
    </>
  );
}
