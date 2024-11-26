import { useState, useEffect } from "react";
import CatalogItem from "./CatalogItem";
import CatalogPagination from "./CatalogPagination";
import { TCatalogItem } from "../types/CatalogItem";

export default function CatalogBlock() {
  const [maxVisibleItems, setMaxVisibleItems] = useState(9);

  const items: TCatalogItem[] = [
    {
      name: "Apple iPhone 12 Pro Max",
      price: "$1,099.00",
      category: "For Phone",
      image: "/iphone.jpg",
    },
    {
      name: "Sony PlayStation 5",
      price: "$499.00",
      category: "For Gaming",
      image: "/playstation.jpg",
    },
    {
      name: "Apple HomePod Mini",
      price: "$99.00",
      category: "For Home",
      image: "/homepod.jpg",
    },
    {
      name: "Sony WH-1000XM4",
      price: "$349.00",
      category: "For Music",
      image: "/headphones.jpg",
    },
    {
      name: "Apple iPhone 12 Pro Max",
      price: "$1,099.00",
      category: "For Phone",
      image: "/iphone.jpg",
    },
    {
      name: "Sony PlayStation 5",
      price: "$499.00",
      category: "For Gaming",
      image: "/playstation.jpg",
    },
    {
      name: "Apple HomePod Mini",
      price: "$99.00",
      category: "For Home",
      image: "/homepod.jpg",
    },
    {
      name: "Sony WH-1000XM4",
      price: "$349.00",
      category: "For Music",
      image: "/headphones.jpg",
    },
    {
      name: "Apple iPhone 12 Pro Max",
      price: "$1,099.00",
      category: "For Phone",
      image: "/iphone.jpg",
    },
    {
      name: "Sony PlayStation 5",
      price: "$499.00",
      category: "For Gaming",
      image: "/playstation.jpg",
    },
    {
      name: "Apple HomePod Mini",
      price: "$99.00",
      category: "For Home",
      image: "/homepod.jpg",
    },
    {
      name: "Sony WH-1000XM4",
      price: "$349.00",
      category: "For Music",
      image: "/headphones.jpg",
    },
    {
      name: "Apple iPhone 12 Pro Max",
      price: "$1,099.00",
      category: "For Phone",
      image: "/iphone.jpg",
    },
  ];

  const updateVisibleItems = () => {
    if (window.innerWidth < 640) {
      setMaxVisibleItems(16);
    } else if (window.innerWidth < 1024) {
      setMaxVisibleItems(12);
    } else {
      setMaxVisibleItems(9);
    }
  };

  useEffect(() => {
    updateVisibleItems();

    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

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
