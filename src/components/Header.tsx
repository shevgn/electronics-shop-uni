import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 z-30 h-14 w-full px-4 md:px-10">
      <nav className="flex h-full w-full justify-between rounded-b-md bg-white shadow">
        <div className="flex items-center justify-center px-4">
          <Link
            className="group flex items-center justify-center space-x-1 text-lg font-bold text-black active:scale-95"
            to="/"
          >
            <svg
              fill="#000000"
              className="h-8 w-8 group-hover:fill-gray-600"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.74 5.135c0 0 0.453 1.922-0.995 2.188-1.005 0.177-2.63-0.823-3.448-1.818-1.010-1.229-0.88-2.198-0.099-3.052 1.177-1.307 3.198-0.802 3.198-0.802s-3.698-3.24-7.547-0.583c-3.427 2.359-2.443 5.573 0.651 8.38 2.786 2.536 0.563 5.318-2.25 4.958-1.922-0.245-2.708-1.792-2.25-2.74 0.401-0.813 1.781-1.313 1.781-1.313s-1.589-0.641-3.453 0.063c-1.682 0.63-3.063 2.016-2.953 5.495v16.104c0 0 1.734-2.135 3.776-4.313 2.281-2.453 3.323-4.109 5.667-3.917 4.438 0.276 7.646-1.698 9.828-4.859 4.188-6.083 0.906-12.88-1.906-13.792z" />
            </svg>
            <p className="group-hover:text-gray-600">Electronics</p>
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-4 px-4">
          <button
            className="rounded-full border border-gray-200 hover:border-gray-300 hover:shadow active:scale-95"
            type="button"
          >
            <svg
              className="m-2 h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3H4.37144C5.31982 3 6.13781 3.66607 6.32996 4.59479L8.67004 15.9052C8.86219 16.8339 9.68018 17.5 10.6286 17.5H17.5"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.82422 7H19.6743C20.3386 7 20.8183 7.6359 20.6358 8.27472L19.6217 11.8242C19.2537 13.1121 18.0765 14 16.7371 14H8.27734"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                cx="16.5"
                cy="20.5"
                r="0.5"
                fill="#000000"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                cx="0.5"
                cy="0.5"
                r="0.5"
                transform="matrix(1 0 0 -1 10 21)"
                fill="#000000"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="visually-hidden">Shopping Cart</span>
          </button>
          <Link
            to="auth"
            className="rounded-full border border-gray-200 hover:border-gray-300 hover:shadow active:scale-95"
            type="button"
          >
            <svg
              className="m-2 h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="visually-hidden">Account</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
