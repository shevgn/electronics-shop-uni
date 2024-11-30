import { Link } from "react-router-dom";
import { TCatalogItem } from "../types/CatalogItem";

export default function CatalogItem({ item }: { item: TCatalogItem }) {
  return (
    <div className="relative mb-4 flex h-full w-full flex-col text-black md:m-0">
      <Link
        to={{
          pathname: `/product/${item.id}`,
        }}
        state={{ item }}
        rel="noopener noreferrer"
        className=""
      >
        <div className="absolute right-2 top-2 rounded-3xl border border-gray-300 bg-white px-1.5 text-xs">
          {item.category}
        </div>
        <div className="mb-2 aspect-square w-full rounded-2xl bg-gray-100 p-6">
          <img
            className="h-full w-full object-cover object-center"
            src={item.image}
            alt=""
          />
        </div>
      </Link>
      <Link
        to={{
          pathname: `/product/${item.id}`,
        }}
        state={{ item }}
        rel="noopener noreferrer"
        className="h-full"
      >
        <p className="text-base font-bold">{item.name}</p>
      </Link>
      <p className="text-base font-medium">{item.price}</p>
      <div className="mt-2 flex h-fit items-center justify-center space-x-2">
        <button
          title="Add to Cart"
          className="w-full flex-1 truncate rounded-3xl border border-gray-200 bg-gray-100 p-2 text-sm font-medium hover:shadow md:text-base"
        >
          <span>Add to Cart</span>
        </button>
        <button
          title="Buy Now"
          className="w-full flex-1 truncate rounded-3xl bg-black p-2 text-sm font-medium text-white md:text-base"
        >
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}
