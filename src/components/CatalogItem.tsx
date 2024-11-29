import { Link } from "react-router-dom";
import { TCatalogItem } from "../types/CatalogItem";

export default function CatalogItem({ item }: { item: TCatalogItem }) {
  return (
    <div className="relative mb-4 h-fit w-full text-black md:m-0">
      <Link
        to={{
          pathname: `/product/${item.id}`,
        }}
        state={{ item }}
        rel="noopener noreferrer"
        className=""
      >
        <div className="absolute right-2 top-2 rounded-3xl border border-gray-300 bg-white p-0.5 px-2 text-xs">
          {item.category}
        </div>
        <div className="mb-2 h-52 rounded-2xl bg-gray-100 p-6 md:h-72">
          <img className="h-full w-full" src={item.image} alt="" />
        </div>
        <p className="text-base font-bold md:text-xl">{item.name}</p>
      </Link>
      <p className="text-base font-semibold md:text-lg">{item.price}</p>
      <div className="mt-2 flex h-fit items-center justify-center space-x-2">
        <button className="w-full rounded-3xl border border-gray-200 bg-gray-100 p-2 text-sm font-medium hover:shadow md:text-base">
          <span>Add to Cart</span>
        </button>
        <button className="w-full rounded-3xl bg-black p-2 text-sm font-medium text-white md:text-base">
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}
