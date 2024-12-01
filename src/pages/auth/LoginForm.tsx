import { useState } from "react";
import InputField from "./InputField";
import MSection from "./MSection";

export default function LoginForm({
  setIsLogin,
}: {
  setIsLogin: (value: null) => void;
}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <MSection key={"login"}>
      <h2 className="p-2 text-4xl">Login</h2>
      <form className="my-10 flex w-full flex-col space-y-4 md:w-1/2 lg:w-1/3">
        <InputField
          onChange={handleChange}
          label={"Email"}
          id={"email"}
          type={"email"}
        />
        <InputField
          onChange={handleChange}
          label={"Password"}
          id={"password"}
          type={"password"}
        />
        <button
          type="submit"
          className="rounded-md border border-black bg-black p-2 font-bold text-white transition-all active:scale-95"
        >
          <span>Confirm</span>
        </button>
      </form>
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
    </MSection>
  );
}
