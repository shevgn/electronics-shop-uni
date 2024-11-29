import CatalogItem from "./CatalogItem";
import CatalogPagination from "./CatalogPagination";
import { TCatalogItem } from "../types/CatalogItem";

export default function CatalogBlock() {
  const maxVisibleItems: number = 24;

  const items: TCatalogItem[] = [
    {
      id: 1,
      name: "Apple iPhone 12 Pro Max",
      price: "$1,099.00",
      category: "For Phone",
      image: "../../public/ps5.webp",
    },
    {
      id: 2,
      name: "Sony PlayStation 5",
      price: "$499.00",
      category: "For Gaming",
      image: "../../public/ps5-wide.webp",
    },
    {
      id: 3,
      name: "Apple HomePod Mini",
      price: "$99.00",
      category: "For Home",
      image: "/homepod.jpg",
    },
    {
      id: 4,
      name: "Sony WH-1000XM4",
      price: "$349.00",
      category: "For Music",
      image: "/headphones.jpg",
    },
    {
      id: 5,
      name: "Apple iPhone 12 Pro Max",
      price: "$1,099.00",
      category: "For Phone",
      image: "/iphone.jpg",
    },
    {
      id: 6,
      name: "Sony PlayStation 5",
      price: "$499.00",
      category: "For Gaming",
      image: "/playstation.jpg",
    },
    {
      id: 7,
      name: "Apple HomePod Mini",
      price: "$99.00",
      category: "For Home",
      image: "/homepod.jpg",
    },
    {
      id: 8,
      name: "Sony WH-1000XM4",
      price: "$349.00",
      category: "For Music",
      image: "/headphones.jpg",
    },
    {
      id: 9,
      name: "Apple iPhone 12 Pro Max",
      price: "$1,099.00",
      category: "For Phone",
      image: "/iphone.jpg",
    },
    {
      id: 10,
      name: "Sony PlayStation 5",
      price: "$499.00",
      category: "For Gaming",
      image: "/playstation.jpg",
    },
    {
      id: 11,
      name: "Apple HomePod Mini",
      price: "$99.00",
      category: "For Home",
      image: "/homepod.jpg",
    },
    {
      id: 12,
      name: "Sony WH-1000XM4",
      price: "$349.00",
      category: "For Music",
      image: "/headphones.jpg",
    },
    {
      id: 13,
      name: "Apple iPhone 12 Pro Max",
      price: "$1,099.00",
      category: "For Phone",
      image: "/iphone.jpg",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
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
