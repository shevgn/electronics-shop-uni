import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import AuthMain from "./AuthMain";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gradient-to-t from-gray-100 to-gray-300 p-4 py-24 sm:p-0">
      <h1 className="visually-hidden">Auth</h1>
      <Link
        to="/"
        className="group absolute bottom-0 flex h-10 w-40 items-center justify-center rounded border-gray-100 bg-white pr-2 shadow transition-all hover:w-20 hover:border sm:bottom-auto sm:left-0 sm:h-32 sm:w-14 sm:justify-end"
      >
        <svg
          className="h-10 w-10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="group-hover:stroke-gray-700"
            d="M4 12H20M4 12L8 8M4 12L8 16"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Link>
      <AnimatePresence mode="wait">
        {isLogin === true && <LoginForm setIsLogin={setIsLogin} />}
        {isLogin === false && <RegisterForm setIsLogin={setIsLogin} />}
        {isLogin === null && <AuthMain setIsLogin={setIsLogin} />}
      </AnimatePresence>
    </main>
  );
}
