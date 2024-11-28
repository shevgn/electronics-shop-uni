import InputField from "../../components/InputField";

export default function LoginForm() {
  return (
    <>
      <h2 className="p-2 text-4xl">Login</h2>
      <form className="my-10 flex w-full flex-col space-y-4 md:w-1/2 lg:w-1/3">
        <InputField label={"Email"} id={"email"} type={"email"} />
        <InputField label={"Password"} id={"password"} type={"password"} />
        <button
          type="submit"
          className="rounded-md border border-black bg-black p-2 font-bold text-white transition-all active:scale-95"
        >
          <span>Confirm</span>
        </button>
      </form>
    </>
  );
}
