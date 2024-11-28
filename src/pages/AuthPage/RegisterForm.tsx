import InputField from "../../components/InputField";

export default function RegisterForm() {
  return (
    <>
      <h2 className="p-2 text-4xl">Create Account</h2>
      <form className="my-10 flex w-full flex-col space-y-4 md:w-1/2 lg:w-1/3">
        <InputField label={"Name"} id={"name"} type={"text"} />
        <InputField label={"Email"} id={"email"} type={"email"} />
        <InputField label={"Password"} id={"password"} type={"password"} />
        <InputField
          label={"Confirm Password"}
          id={"confirm-password"}
          type={"password"}
        />
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
