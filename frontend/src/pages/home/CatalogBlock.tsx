import CatalogItem from "./CatalogItem";
import CatalogPagination from "./CatalogPagination";
import { ICatalogItem } from "@/types/index";

const maxVisibleItems: number = 24;

export default function CatalogBlock() {
  const items: ICatalogItem[] = [
    {
      id: 1,
      name: "Apple iPhone 12 Pro Max",
      price: 1099.0,
      category: "For Phone",
      image: "../../public/ps5.webp",
    },
    {
      id: 2,
      name: "Sony PlayStation 5",
      price: 499.0,
      category: "For Gaming",
      image: "../../public/ps5-wide.webp",
    },
    {
      id: 3,
      name: "Apple HomePod Mini",
      price: 99.0,
      category: "For Home",
      image: "/homepod.jpg",
    },
    {
      id: 4,
      name: "Sony WH-1000XM4",
      price: 349.0,
      category: "For Music",
      image: "/headphones.jpg",
    },
    {
      id: 5,
      name: "Apple iPhone 12 Pro Max",
      price: 1099.0,
      category: "For Phone",
      image: "/iphone.jpg",
    },
    {
      id: 6,
      name: "Sony PlayStation 5",
      price: 499.0,
      category: "For Gaming",
      image: "/playstation.jpg",
    },
    {
      id: 7,
      name: "Apple HomePod Mini",
      price: 99.0,
      category: "For Home",
      image: "/homepod.jpg",
    },
    {
      id: 8,
      name: "Sony WH-1000XM4",
      price: 349.0,
      category: "For Music",
      image: "/headphones.jpg",
    },
    {
      id: 9,
      name: "Apple iPhone 12 Pro Max",
      price: 1099.0,
      category: "For Phone",
      image: "/iphone.jpg",
    },
    {
      id: 10,
      name: "Sony PlayStation 5",
      price: 499.0,
      category: "For Gaming",
      image: "/playstation.jpg",
    },
    {
      id: 11,
      name: "Apple HomePod Mini",
      price: 99.0,
      category: "For Home",
      image: "/homepod.jpg",
    },
    {
      id: 12,
      name: "Sony WH-1000XM4",
      price: 349.0,
      category: "For Music",
      image: "/headphones.jpg",
    },
    {
      id: 13,
      name: "Apple iPhone 12 Pro Max",
      price: 1099.0,
      category: "For Phone",
      image: "/iphone.jpg",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-2 xl:grid-cols-5 xl:gap-4">
        {items.map(
          (item, index) =>
            index < maxVisibleItems && <CatalogItem key={index} item={item} />,
        )}
      </div>
      <div className="mb-4 mt-2 h-0.5 w-full bg-gray-200 md:mt-6"></div>
      <CatalogPagination
        itemsCount={items.length + 200}
        maxItemsPerPage={maxVisibleItems}
      />
    </>
  );
}
