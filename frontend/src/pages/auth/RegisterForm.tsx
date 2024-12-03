import { useState } from "react";
import InputField from "./InputField";
import MSection from "./MSection";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useApi from "@/hooks/useApi";
import { LoginResponse } from "@/types";
import { login, register } from "@/features/userSlice";

export default function RegisterForm({
  setIsLogin,
}: {
  setIsLogin: (value: null) => void;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { data, error, isLoading, fetchData } = useApi<LoginResponse>(
    "http://localhost:3000/users/register",
    { skipFetch: true },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetchData({
        method: "POST",
        body: form,
      });

      if (response && response.token) {
        dispatch(
          login({
            token: response.token,
            user: { name: response.user.name, email: response.user.email },
          }),
        );
        navigate("/");
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Register error:", err);
      }
    }
  };

  return (
    <MSection>
      <h2 className="p-2 text-4xl">Create Account</h2>
      <form
        onSubmit={handleRegister}
        className="my-4 flex w-full flex-col space-y-4 md:w-1/2 lg:w-1/3"
      >
        <InputField
          onChange={handleChange}
          label={"Name"}
          id={"name"}
          type={"text"}
        />
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
        <InputField
          onChange={handleChange}
          label={"Confirm Password"}
          id={"confirmPassword"}
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
