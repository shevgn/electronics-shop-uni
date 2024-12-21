import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import * as types from "@/types";

export default function Product() {
  const location = useLocation();
  const item: types.Product = location.state.item;

  return (
    <>
      <Header />
      <main className="relative mb-16">
        {item ? (
          <section className="flex flex-col items-center justify-center px-4 text-black md:px-10">
            <h1 className="sr-only">{item.name}</h1>
            <motion.div
              layout
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
              className="flex w-2/3 items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 pt-16 md:mb-10 md:w-1/2"
            >
              <h2 className="font-bold text-black sm:text-lg md:text-2xl">
                {item.name}
              </h2>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0.3,
                scale: 0.8,
                backgroundImage:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))",
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                backgroundImage:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))",
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-10 mt-8 h-96 w-full rounded-lg"
            >
              <img
                className="h-full w-full rounded-lg object-cover text-xl text-white"
                src={item.images.find((image) => image.includes("wide"))}
                alt={item.name}
              />
            </motion.div>
            <div className="flex h-full w-full flex-col space-y-2 rounded-lg border border-gray-200 p-4 md:flex-row md:space-x-4">
              <div className="relative w-full rounded-lg border border-gray-200 md:w-2/3">
                <img
                  className="h-full w-full"
                  src={item.images.find((image) => image.includes("preview"))}
                  alt=""
                />
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-gray-200 p-1 transition-all hover:scale-110 active:scale-90"
                  type="button"
                >
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="visually-hidden">Left</span>
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-gray-200 p-1 transition-all hover:scale-110 active:scale-90"
                  type="button"
                >
                  <svg
                    className="h-8 w-8 rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="h-auto w-px bg-black"></div>
              <ul className="h-auto w-full border border-gray-200 px-2">
                <li className="border-b border-gray-200 p-2 text-lg font-semibold">
                  Характеристики
                </li>
                <li className="border-b border-gray-200 p-1">
                  Brand: {item.brand}
                </li>
                <li className="border-b border-gray-200 p-1">
                  Name: {item.name}
                </li>
                {Object.entries(item.details).map(([key, value], index) => (
                  <li key={index} className="border-b border-gray-200 p-1">
                    {key}: {value}
                  </li>
                ))}
                <li className="border-b border-gray-200 p-1">
                  Release year: {item.release_year}
                </li>
                <li className="border-b border-gray-200 p-1">
                  Price: ${item.price.toFixed(2)}
                </li>
              </ul>
            </div>
          </section>
        ) : (
          <p>Loading...</p>
        )}
      </main>
      <Footer />
    </>
  );
}
