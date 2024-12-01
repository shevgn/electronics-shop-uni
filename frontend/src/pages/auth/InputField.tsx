import { useState } from "react";

export default function InputField({
  onChange,
  label,
  id,
  type,
  name,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id: string;
  type: string;
  name?: string;
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
        onChange={(e) => onChange(e)}
        onInput={(e) => setValue(e.currentTarget.value)}
        id={id}
        type={type}
        name={name ? name : id}
        required
        className="w-full rounded-md border border-gray-200 bg-white p-3 focus:border-gray-500 focus:outline-none"
      />
    </p>
  );
}
