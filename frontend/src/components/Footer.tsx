export default function Footer() {
  return (
    <footer className="flex h-full flex-col items-center space-y-4 px-4 md:px-10">
      <section className="mb-4 w-full space-y-4 rounded-xl bg-gradient-to-br from-gray-700 to-black p-4 text-black md:space-y-8 md:p-6">
        <h2 className="w-full text-3xl font-semibold text-white md:w-2/5 md:text-4xl lg:text-5xl">
          Subscribe for new arrivals
        </h2>
        <form className="w-full md:w-2/5" action="" method="post">
          <div className="flex flex-row items-center rounded-full bg-white pr-2">
            <label htmlFor="email" className="visually-hidden">
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              aria-required="true"
              autoComplete="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-l-full bg-transparent py-2 pl-4 transition-all focus:outline-none md:p-2 md:px-6"
            />
            <button
              type="submit"
              className="rounded-full border border-white bg-black p-1.5 px-3 text-sm font-medium text-white md:px-5"
            >
              <span>Send</span>
            </button>
          </div>
        </form>
      </section>
      <div className="flex h-14 w-full items-center justify-between border-t border-t-gray-300 p-4 text-gray-500">
        <p className="">2024</p>
        <p className="">Levchenko Artem</p>
      </div>
    </footer>
  );
}
