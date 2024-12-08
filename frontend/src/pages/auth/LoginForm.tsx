import { useState } from "react";
import InputField from "./InputField";
import MSection from "./MSection";
import { LoginResponse } from "@/types";
import useApi from "@/hooks/useApi";
import { useDispatch } from "react-redux";
import { login } from "@/features/userSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm({
  setIsLogin,
}: {
  setIsLogin: (value: null) => void;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { data, error, isLoading, fetchData } = useApi<LoginResponse>(
    "http://localhost:3000/users/login",
    { skipFetch: true },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetchData({
        method: "POST",
        body: form,
      });

      if (response && response.token) {
        dispatch(
          login({
            token: response.token,
            user: {
              name: response.user.name,
              email: response.user.email,
              role: response.user.role,
            },
          }),
        );
        navigate("/");
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Login error:", err);
      }
    }
  };

  return (
    <MSection>
      <h2 className="p-2 text-4xl">Login</h2>
      <form
        onSubmit={handleLogin}
        className="my-10 flex w-full flex-col space-y-4 md:w-1/2 lg:w-1/3"
      >
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
          disabled={isLoading}
          type="submit"
          className="rounded-md border border-black bg-black p-2 font-bold text-white transition-all active:scale-95"
        >
          <span>{isLoading ? "Loading..." : "Confirm"}</span>
        </button>
        {error && (
          <p className="mt-2 text-center text-red-500">
            {error.status === 401 ? "Invalid email or password" : error.message}
          </p>
        )}
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 12L12 19L19 12"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="visually-hidden">Close</span>
      </button>
    </MSection>
  );
}
