import { useState } from "react";

export default function InputField({
  label,
  id,
  type,
}: {
  label: string;
  id: string;
  type: string;
}) {
  const [value, setValue] = useState("");

  return (
    <p className="group relative rounded-md shadow">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-2 bg-white px-1 text-sm text-gray-500 transition-all ${value ? "-top-3" : "top-4 group-focus-within:-top-3"}`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-md border border-gray-200 bg-white p-3 focus:border-gray-500 focus:outline-none"
      />
    </p>
  );
}
