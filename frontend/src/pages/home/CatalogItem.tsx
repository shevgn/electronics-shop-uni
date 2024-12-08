import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/types/index";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/features/cartSlice";
import { RootState } from "@/store";

export default function CatalogItem({ item }: { item: Product }) {
  const user = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();

  const addToCart = () => {
    if (!user) {
      alert("Please log in to add items to your cart");
      return;
    }
    dispatch(
      addItem({ id: item.id, name: item.name, price: item.price, quantity: 1 }),
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="relative flex h-full w-full flex-col pb-8 text-black sm:pb-4 md:p-0"
    >
      <Link
        to={{
          pathname: `/products/${item.id}`,
        }}
        state={{ item }}
        rel="noopener noreferrer"
        className=""
      >
        <ul className="absolute right-2 top-2 flex flex-row space-x-1">
          {item.categories.map((category) => (
            <li
              key={category}
              className="rounded-3xl border border-gray-300 bg-white px-1.5 text-center text-xs"
            >
              {category}
            </li>
          ))}
        </ul>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mb-2 aspect-square w-full rounded-2xl bg-gray-100 p-6"
        >
          <img
            className="h-full w-full object-cover object-center"
            src={item.images.find((image) => image.includes("preview"))}
            alt={item.name}
          />
        </motion.div>
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
      <p className="text-base font-medium">${item.price.toFixed(2)}</p>
      <div className="mt-2 flex h-fit items-center justify-center space-x-2">
        <button
          title="Add to Cart"
          onClick={addToCart}
          className="w-full flex-1 truncate rounded-3xl border border-gray-200 bg-gray-100 p-2 text-sm font-medium hover:scale-105 2xl:text-base"
        >
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
}
