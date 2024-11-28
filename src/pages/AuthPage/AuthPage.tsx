import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gradient-to-t from-gray-100 to-gray-300 p-4 py-56 sm:p-0">
      <h1 className="visually-hidden">Login</h1>
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
      <section
        className={`relative flex h-full w-full flex-col items-center justify-center rounded-lg bg-white p-4 font-semibold text-black shadow-lg transition-all sm:h-2/3 sm:w-2/3 ${isLogin === null && "space-y-4"}`}
      >
        {isLogin !== null && (
          <button
            onClick={() => setIsLogin(null)}
            className="absolute right-4 top-0 rounded-b-full p-2 shadow transition-all hover:pt-4"
            type="button"
          >
            <svg
              className="h-8 w-8 rotate-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 12L12 19L19 12"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="visually-hidden">Close</span>
          </button>
        )}
        {isLogin === true ? (
          <LoginForm />
        ) : isLogin === false ? (
          <RegisterForm />
        ) : (
          <>
            <button
              onClick={() => setIsLogin(true)}
              className="w-2/3 rounded-lg border border-black bg-black p-4 text-white transition-all hover:scale-105 sm:w-1/3 sm:p-3"
              type="button"
            >
              <span>Login</span>
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className="w-2/3 rounded-lg border border-black bg-white p-4 transition-all hover:scale-105 sm:w-1/3 sm:p-3"
              type="button"
            >
              <span>Sign Up</span>
            </button>
          </>
        )}
      </section>
    </main>
  );
}
